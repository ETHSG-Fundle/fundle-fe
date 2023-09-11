"use client";

import Gallery from "@/components/Gallery";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Contract } from "ethers";
import erc20Abi from "../../ABIs/erc20.abi.json";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { addresses } from "@/constants/addresses";
import donationManagerAbi from "../../ABIs/BeneficiaryDonationManager.abi.json";
import { reduceDecimals, toUSDString } from "../utils/web3utils";
import chestImage from "../../../public/chest.png";
import Image from "next/image";
import type { Chain } from "@web3-onboard/common/dist/types";
import MiniSelector from "@/components/Miniselector";
import ETH from "../../../public/eth.png";
import LINEA from "../../../public/linea.png";
import MANTLE from "../../../public/mantle.png";

export default function Page() {
  // Hooks
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

  const chainViewModel = [
    { name: "Ethereum", image: ETH },
    { name: "Mantle", image: MANTLE },
    { name: "Linea", image: LINEA },
  ];

  // Values
  const [usdcBalance, setUsdcBalance] = useState<string | undefined>("0");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedChainIndex, setSelectedChainIndex] = useState<number>();
  const [chainList, setChainList] = useState<Chain[]>();

  const [totalDonations, setTotalDonations] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Contracts
  const [usdcContract, setUsdcContract] = useState<Contract>();
  const [donationManagerContract, setDonationManagerContract] =
    useState<Contract>();
  const [mantleRelayerContract, setMantleRelayerContract] =
    useState<Contract>();
  const [lineaRelayerContract, setLineaRelayerContract] = useState<Contract>();

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
      if (wallet?.provider) {
        // if using ethers v6 this is:
        let provider = new ethers.BrowserProvider(wallet.provider, "any");
        let signer = await provider.getSigner();

        const internalMantleRelayerContract = new Contract(
          addresses.mantleRelayerContract,
          donationManagerAbi.abi,
          signer
        );
        setMantleRelayerContract(internalMantleRelayerContract);
        const internalLineaRelayerContract = new Contract(
          addresses.lineaRelayerContract,
          donationManagerAbi.abi,
          signer
        );
        setLineaRelayerContract(internalLineaRelayerContract);

        const internalUsdcContract = new Contract(
          addresses.ausdcContract,
          erc20Abi,
          signer
        );
        setUsdcContract(internalUsdcContract);

        const internalDonationManagerContract = new Contract(
          addresses.donationManager,
          donationManagerAbi.abi,
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
    // If the wallet has a provider than the wallet is connected

    const getUSDCBalance = async () => {
      if (usdcContract && wallet) {
        const rawUsdcBalance = await usdcContract.balanceOf(
          wallet.accounts[0].address
        );
        const retrievedUsdcBalance = toUSDString(rawUsdcBalance, 6);

        setUsdcBalance(retrievedUsdcBalance.toString());
      }
    };

    getUSDCBalance();
  }, [usdcContract, wallet]);

  useEffect(() => {
    const getTotalDonationsAmount = async () => {
      let totalDonationsAmountForMainPoolPromise,
        totalDonationsAmountForBeneficiariesPromise;
      if (usdcContract) {
        totalDonationsAmountForMainPoolPromise = await usdcContract.balanceOf(
          addresses.donationManager
        );
      }
      if (donationManagerContract) {
        totalDonationsAmountForBeneficiariesPromise =
          await donationManagerContract.getTotalEpochDonation(0);
      }

      const [
        totalDonationsAmountForMainPool,
        totalDonationsAmountForBeneficiaries,
      ] = await Promise.all([
        totalDonationsAmountForMainPoolPromise,
        totalDonationsAmountForBeneficiariesPromise,
      ]);
      const rawTotalDonationsAmount =
        totalDonationsAmountForMainPool + totalDonationsAmountForBeneficiaries;
      const totalDonationsAmount = reduceDecimals(rawTotalDonationsAmount, 6);
      setTotalDonations(totalDonationsAmount);
    };
    getTotalDonationsAmount();
  }, [usdcContract, donationManagerContract]);

  const depositHandler = async () => {
    const donationAmount = Number(parseFloat(inputValue) * Math.pow(10, 6));

    const depositUsingEthereum = async () => {
      setIsLoading(true);
      const approveAmount = async () => {
        if (usdcContract) {
          try {
            const tx = await usdcContract.approve(
              addresses.donationManager,
              Number(parseFloat(inputValue) * Math.pow(10, 6))
            );
            await tx.wait();
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
          }
        }
      };

      const donateAmount = async () => {
        setIsLoading(true);
        if (donationManagerContract) {
          try {
            const tx =
              await donationManagerContract.depositForEpochDistribution(
                Number(parseFloat(inputValue) * Math.pow(10, 6))
              );
            await tx.wait();
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
          }
        }
      };
      await approveAmount();
      await donateAmount();
    };

    const depositUsingMantle = async () => {
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
        const value = ethers.parseEther("143");
        const donationTx = await mantleRelayerContract?.executeMainDonation(
          "ethereum-2",
          addresses.donationManager,
          0,
          donationAmount,
          2, // Donation type -- donate to quadratic pool
          { value } // "pump it with a lot of gas" - rui yang :DDDDD
        );
        await donationTx.wait();
        console.log("For Axelar:", donationTx.hash);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    const depositUsingLinea = async () => {
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
        const value = ethers.parseEther("143");
        const donationTx = await lineaRelayerContract?.executeMainDonation(
          "ethereum-2",
          addresses.donationManager,
          0,
          donationAmount,
          2, // Donation type -- donate to quadratic pool
          { value } // "pump it with a lot of gas" - rui yang :DDDDD
        );
        await donationTx.wait();
        console.log("For Axelar:", donationTx.hash);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    if (selectedChainIndex === 0) {
      depositUsingEthereum();
    } else if (selectedChainIndex === 1) {
      depositUsingMantle();
    } else if (selectedChainIndex === 2) {
      depositUsingLinea();
    }
  };

  const setActiveTabHandler = (tabId: number) => {
    if (chainList) {
      setChain({ chainId: chainList[tabId].id });
    }
  };

  // JSX
  const banner = (
    <div className="flex bg-red-light p-8 rounded-md justify-between">
      <div className="flex flex-col">
        <h1>Total Donations: ${totalDonations?.toFixed()}</h1>
        <p>
          Not sure who to donate to? Donate directly to the pool and let the
          community decide where your funds go!
        </p>
        <p>Donate via any chain:</p>
        <MiniSelector
          labels={chainViewModel.map((chain) => chain.name)}
          images={chainViewModel.map((chain) => chain.image)}
          activeTab={selectedChainIndex || 0}
          setActiveTab={setActiveTabHandler}
          isLoading={settingChain}
        />
        <p>
          Your USDC balance on {chainViewModel[selectedChainIndex || 0].name}:{" "}
          {usdcBalance}
        </p>
        <div className="mt-4 flex-col flex items-start gap-4">
          <Input
            className="w-96"
            placeholder="eg. 1000 USDC"
            unit="USDC"
            onChange={(value) => {
              setInputValue(value);
            }}
          />
          <Button
            className="w-36"
            title="Donate"
            onClick={depositHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Image src={chestImage} width={300} height={300} alt="chest"></Image>
    </div>
  );

  return (
    <div className="">
      <section className="">{banner}</section>
      <section className="ml-8 mt-4 mb-8">
        <h1>Fund Accredited Projects 💎</h1>
        <p>Donate to your favourite causes!</p>
      </section>
      <Gallery />
    </div>
  );
}
