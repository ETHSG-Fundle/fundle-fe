"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BeneficiaryViewModel, dummyData } from "@/constants/ViewModels";
import ChainSelector from "@/components/ChainSelector";
import ETH from "../../../../public/eth.png";
import LINEA from "../../../../public/linea.png";
import MANTLE from "../../../../public/mantle.png";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers, Contract } from "ethers";
import DonationRelayerAbi from "../../../ABIs/GmpDonationRelayer.json";
import ERC20Abi from "../../../ABIs/erc20.abi.json";
import DonationManagerAbi from "../../../ABIs/BeneficiaryDonationManager.abi.json";

import { addresses } from "@/constants/addresses";
import type { ConnectedChain } from "@web3-onboard/core/dist/types";
import type { Chain } from "@web3-onboard/common/dist/types";

export default function Page({ params }: { params: { id: number } }) {
  const viewModel: BeneficiaryViewModel = dummyData[params.id];

  const chainViewModel = [
    { name: "Ethereum", image: ETH },
    { name: "Mantle", image: MANTLE },
    { name: "Linea", image: LINEA },
  ];

  const [tab, setTab] = useState(0);

  const [mantleRelayerContract, setMantleRelayerContract] =
    useState<Contract>();
  const [mantleUsdcContract, setMantleUsdcContract] = useState<Contract>();

  const [donationManagerContract, setDonationManagerContract] =
    useState<Contract>();

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedChainIndex, setSelectedChainIndex] = useState<number>();
  const [chainList, setChainList] = useState<Chain[]>();

  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting, // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet
    updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
    setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
    setPrimaryWallet, // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
  ] = useConnectWallet();

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();

  useEffect(() => {
    const createContracts = async () => {
      if (wallet) {
        let provider = new ethers.BrowserProvider(wallet.provider, "any");
        let signer = await provider.getSigner();

        const internalDonationRelayerContract = new Contract(
          addresses.mantleRelayerContract,
          DonationRelayerAbi.abi,
          signer
        );
        setMantleRelayerContract(internalDonationRelayerContract);

        const internalMantleUsdcContract = new Contract(
          addresses.mantleAusdcContract,
          ERC20Abi,
          signer
        );
        setMantleUsdcContract(internalMantleUsdcContract);

        const internalDonationManagerContract = new Contract(
          addresses.donationManager,
          DonationManagerAbi.abi,
          signer
        );
        setDonationManagerContract(internalDonationManagerContract);
      }
    };

    createContracts();
  }, [wallet]);

  useEffect(() => {
    if (connectedChain) {
      console.log("connectedChainId", connectedChain.id);
      console.log(
        "find index",
        chainList?.findIndex((chain) => {
          return chain.id == connectedChain.id;
        })
      );
      setSelectedChainIndex(
        chainList?.findIndex((chain) => {
          return chain.id == connectedChain.id;
        })
      );
    }
  }, [connectedChain]);

  useEffect(() => {
    if (chains) {
      setChainList(chains);
    }
  }, [chains]);

  // useEffect(() => {
  //   if (connectedChain) {
  //     console.log(
  //       chains.findIndex((chain) => {
  //         chain.id == connectedChain.id;
  //       })
  //     );
  //     setTab(
  //       chains.findIndex((chain) => {
  //         chain.id == connectedChain.id;
  //       })
  //     );
  //   }
  // }, [connectedChain]);

  // useEffect(() => {
  //   if (wallet) {
  //     if (connectedChain?.id === chains[tab].id) {
  //     } else {
  //       setChain({ chainId: chains[tab].id });
  //     }
  //   }
  // }, [wallet, tab]);

  // Actions
  const donationHandler = async () => {
    const donationAmount = Number(parseFloat(inputValue) * Math.pow(10, 6));

    const gasOptions = {
      gasPrice: ethers.parseUnits("5", "gwei"),
      gasLimit: 10000,
    };

    const donateUsingMantle = async () => {
      await mantleUsdcContract?.approve(mantleRelayerContract, donationAmount);
      await mantleRelayerContract?.executeMainDonation(
        params.id,
        donationAmount,
        1, // Donation type -- donate direct to beneficiary
        gasOptions
      );
    };

    const donateUsingLinea = async () => {};

    const donateUsingEthereum = async () => {
      await mantleUsdcContract?.approve(
        donationManagerContract,
        donationAmount
      );
      await donationManagerContract?.donateBeneficiary(
        params.id,
        donationAmount
      );
    };

    if (tab === 0) {
      donateUsingEthereum();
    } else if (tab === 1) {
      donateUsingMantle();
    } else if (tab === 2) {
      donateUsingLinea();
    }

    // "pump it with a lot of gas" - rui yang
  };

  const setActiveTabHandler = (tabId: number) => {
    if (chainList) {
      setChain({ chainId: chainList[tabId].id });
    }
  };

  useEffect(() => {
    console.log("connectedChain", connectedChain);
    console.log("chains", chains);
  }, [connectedChain, chains]);

  return (
    <div className="flex p-16">
      <div className="flex flex-col pr-16 w-3/5">
        <div className="flex justify-center">
          <Image
            className="w-full h-96 object-cover"
            src={viewModel.image}
            // width={500}
            // height={300}
            alt="test"
          />
        </div>
        <h1>About Us</h1>
        <p>
          This is some description about the organization that is not truncated.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="sticky top-32">
          <div className="bg-red rounded-tl-3xl rounded-tr-3xl px-8">
            <h1 className="text-white">Donate</h1>
          </div>
          <div className="bg-red-light rounded-bl-3xl rounded-br-3xl px-8 pb-8">
            <h1>{viewModel.name}</h1>
            <h1 className="font-body text-4xl font-medium">$78,374</h1>
            <p className="mb-4">raised from 325 donors</p>
            <ProgressBar percent={20} />
            <p>10% of donation pool</p>
            <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
            <p>Select chain:</p>
            <ChainSelector
              labels={chainViewModel.map((chain) => chain.name)}
              images={chainViewModel.map((chain) => chain.image)}
              activeTab={selectedChainIndex || 0}
              setActiveTab={setActiveTabHandler}
              isLoading={settingChain}
            />
            <p className="mb-2">Enter donation amount:</p>
            <Input
              className="w-full"
              placeholder="eg. 1000 USDC"
              onChange={(value) => {
                setInputValue(value);
              }}
              unit="USDC"
            ></Input>

            <Button
              className="w-full mt-6"
              title="Donate"
              isRounded={true}
              onClick={donationHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
