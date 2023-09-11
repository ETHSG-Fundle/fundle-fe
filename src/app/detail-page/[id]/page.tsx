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
import { ethers } from "ethers";
import { Contract } from "ethers";
import DonationRelayerAbi from "../../../ABIs/GmpDonationRelayer.json";
import ERC20Abi from "../../../ABIs/erc20.abi.json";
import DonationManagerAbi from "../../../ABIs/BeneficiaryDonationManager.abi.json";

import { addresses } from "@/constants/addresses";
import type { Chain } from "@web3-onboard/common/dist/types";
import { reduceDecimals } from "../../utils/web3utils";

export default function Page({ params }: { params: { id: number } }) {
  const viewModel: BeneficiaryViewModel = dummyData[params.id];

  const chainViewModel = [
    { name: "Ethereum", image: ETH },
    { name: "Mantle", image: MANTLE },
    { name: "Linea", image: LINEA },
  ];

  //Values
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedChainIndex, setSelectedChainIndex] = useState<number>();
  const [chainList, setChainList] = useState<Chain[]>();

  const [donationsReceived, setDonationsReceived] = useState<number>();
  const [totalDonationsReceived, setTotalDonationsReceived] =
    useState<number>();
  const [percentageDonations, setPercentageDonations] = useState<string>("");
  const [quadraticScore, setQuadraticScore] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Contracts
  const [mantleRelayerContract, setMantleRelayerContract] =
    useState<Contract>();
  const [lineaRelayerContract, setLineaRelayerContract] = useState<Contract>();
  const [usdcContract, setUsdcContract] = useState<Contract>();
  const [donationManagerContract, setDonationManagerContract] =
    useState<Contract>();
  const [readOnlyDonationManagerContract, setReadOnlyDonationManagerContract] =
    useState<Contract>();

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

  // useEffect(() => {
  //   const createAndReadContracts = async () => {
  //     let readonlyProvider = new ethers.JsonRpcProvider(
  //       `https://public.blockchainnodeengine.app/eth_goerli?apikey=GCPWEB3_ETHSG`
  //     );
  //     const internalReadOnlyDonationContract = new Contract(
  //       addresses.donationManager,
  //       DonationManagerAbi.abi,
  //       readonlyProvider
  //     );
  //     setReadOnlyDonationManagerContract(internalReadOnlyDonationContract);
  //     if (readOnlyDonationManagerContract) {
  //       const epochIndex = 0;
  //       const beneficiaryIndex = params.id;
  //       const donationsReceivedInEpochPromise =
  //         readOnlyDonationManagerContract.getEpochBeneficiaryDonation(
  //           epochIndex,
  //           beneficiaryIndex
  //         );
  //       const totalDonationsReceivedInEpochPromise =
  //         readOnlyDonationManagerContract.getTotalEpochDonation(epochIndex);
  //       const epochDonationDistributionPromise =
  //         readOnlyDonationManagerContract.getEpochDonationDistribution(
  //           epochIndex
  //         );

  //       const [
  //         rawDonationsReceivedInEpoch,
  //         rawTotalDonationsReceivedInEpoch,
  //         epochDonationDistribution,
  //       ] = await Promise.all([
  //         donationsReceivedInEpochPromise,
  //         totalDonationsReceivedInEpochPromise,
  //         epochDonationDistributionPromise,
  //       ]);

  //       const donationsReceivedInEpoch = reduceDecimals(
  //         rawDonationsReceivedInEpoch,
  //         6
  //       );
  //       setDonationsReceived(donationsReceivedInEpoch);
  //       const totalDonationsReceivedInEpoch = reduceDecimals(
  //         rawTotalDonationsReceivedInEpoch,
  //         6
  //       );
  //       setTotalDonationsReceived(totalDonationsReceivedInEpoch);
  //       const internalPercentageDonations =
  //         (100 * (donationsReceivedInEpoch || 0)) /
  //         (totalDonationsReceivedInEpoch || 1);
  //       setPercentageDonations(internalPercentageDonations.toFixed(2));

  //       const { 0: _, 1: quadScoreArray } = epochDonationDistribution;
  //       const rawQuadraticScore = quadScoreArray[params.id];
  //       const internalQuadraticScore = reduceDecimals(rawQuadraticScore, 2);
  //       setQuadraticScore(internalQuadraticScore);
  //     }
  //   };
  //   createAndReadContracts()
  // }, [readOnlyDonationManagerContract]);

  useEffect(() => {
    const createContracts = async () => {
      if (wallet?.provider) {
        let provider = new ethers.BrowserProvider(wallet.provider, "any");
        let readonlyProvider = new ethers.JsonRpcProvider(
          `https://public.blockchainnodeengine.app/eth_goerli?apikey=GCPWEB3_ETHSG`
        );
        let signer = await provider.getSigner();
        const internalReadOnlyDonationContract = new Contract(
          addresses.donationManager,
          DonationManagerAbi.abi,
          readonlyProvider
        );
        setReadOnlyDonationManagerContract(internalReadOnlyDonationContract);

        const internalMantleDonationRelayerContract = new Contract(
          addresses.mantleRelayerContract,
          DonationRelayerAbi.abi,
          signer
        );
        setMantleRelayerContract(internalMantleDonationRelayerContract);
        const internalLineaDonationRelayerContract = new Contract(
          addresses.lineaRelayerContract,
          DonationRelayerAbi.abi,
          signer
        );
        setLineaRelayerContract(internalLineaDonationRelayerContract);

        const internalUsdcContract = new Contract(
          addresses.mantleAusdcContract,
          ERC20Abi,
          signer
        );
        setUsdcContract(internalUsdcContract);

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
      setSelectedChainIndex(
        chainList?.findIndex((chain) => {
          return chain.id == connectedChain.id;
        })
      );
    }
  }, [connectedChain, chainList]);

  useEffect(() => {
    if (chains) {
      setChainList(chains);
    }
  }, [chains]);

  useEffect(() => {
    const getDonationAmount = async () => {
      if (readOnlyDonationManagerContract) {
        const epochIndex = 0;
        const beneficiaryIndex = params.id;
        const donationsReceivedInEpochPromise =
          readOnlyDonationManagerContract.getEpochBeneficiaryDonation(
            epochIndex,
            beneficiaryIndex
          );
        const totalDonationsReceivedInEpochPromise =
          readOnlyDonationManagerContract.getTotalEpochDonation(epochIndex);
        const epochDonationDistributionPromise =
          readOnlyDonationManagerContract.getEpochDonationDistribution(
            epochIndex
          );

        const [
          rawDonationsReceivedInEpoch,
          rawTotalDonationsReceivedInEpoch,
          epochDonationDistribution,
        ] = await Promise.all([
          donationsReceivedInEpochPromise,
          totalDonationsReceivedInEpochPromise,
          epochDonationDistributionPromise,
        ]);

        const donationsReceivedInEpoch = reduceDecimals(
          rawDonationsReceivedInEpoch,
          6
        );
        setDonationsReceived(donationsReceivedInEpoch);
        const totalDonationsReceivedInEpoch = reduceDecimals(
          rawTotalDonationsReceivedInEpoch,
          6
        );
        setTotalDonationsReceived(totalDonationsReceivedInEpoch);
        const internalPercentageDonations =
          (100 * (donationsReceivedInEpoch || 0)) /
          (totalDonationsReceivedInEpoch || 1);
        setPercentageDonations(internalPercentageDonations.toFixed(2));

        const { 0: _, 1: quadScoreArray } = epochDonationDistribution;
        const rawQuadraticScore = quadScoreArray[params.id];
        const internalQuadraticScore = reduceDecimals(rawQuadraticScore, 2);
        setQuadraticScore(internalQuadraticScore);
      }
    };
    getDonationAmount();
  }, [readOnlyDonationManagerContract, params.id]);

  // Actions
  const donationHandler = async () => {
    const donationAmount = Number(parseFloat(inputValue) * Math.pow(10, 6));

    const donateUsingMantle = async () => {
      setIsLoading(true);
      try {
        const approval = await usdcContract?.approve(
          mantleRelayerContract,
          donationAmount
        );
        await approval.wait();
      } catch (e) {
        setIsLoading(false);
      }

      try {
        const value = ethers.parseEther("5");
        const donationTx = await lineaRelayerContract?.executeMainDonation(
          "ethereum-2",
          addresses.goerliReceiverContract,
          params.id,
          donationAmount,
          1, // Donation type -- donate direct to beneficiary
          { value } // "pump it with a lot of gas" - rui yang :DDDDD
        );
        await donationTx.wait();
        console.log("For Axelar:", donationTx.hash);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    const donateUsingLinea = async () => {
      setIsLoading(true);
      try {
        const approval = await usdcContract?.approve(
          lineaRelayerContract,
          donationAmount
        );
        await approval.wait();
      } catch (e) {
        setIsLoading(false);
      }

      try {
        const value = ethers.parseEther("0.03");
        const donationTx = await lineaRelayerContract?.executeMainDonation(
          "ethereum-2",
          addresses.goerliReceiverContract,
          params.id,
          donationAmount,
          1, // Donation type -- donate direct to beneficiary
          { value } // "pump it with a lot of gas" - rui yang :DDDDD
        );
        await donationTx.wait();
        console.log("For Axelar:", donationTx.hash);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    const donateUsingEthereum = async () => {
      setIsLoading(true);
      try {
        const approval = await usdcContract?.approve(
          donationManagerContract,
          donationAmount
        );
        await approval.wait();
      } catch (e) {
        setIsLoading(false);
      }

      try {
        const donationTx = await donationManagerContract?.donateBeneficiary(
          params.id,
          donationAmount
        );
        await donationTx.wait();
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    if (selectedChainIndex === 0) {
      donateUsingEthereum();
    } else if (selectedChainIndex === 1) {
      donateUsingMantle();
    } else if (selectedChainIndex === 2) {
      donateUsingLinea();
    }
  };

  const setActiveTabHandler = (tabId: number) => {
    if (chainList) {
      setChain({ chainId: chainList[tabId].id });
    }
  };

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
            <h1 className="font-body text-4xl font-medium">
              ${donationsReceived}
            </h1>
            <p className="mb-4">raised from 325 donors</p>
            <ProgressBar percent={percentageDonations ?? 0} />
            <p>
              <span className="font-bold">{percentageDonations}%</span> of
              donations went to {viewModel.name}, earning them{" "}
              <span className="font-bold">{quadraticScore?.toFixed(0)}% </span>
              of the yield generated from our farm.
            </p>
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
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
