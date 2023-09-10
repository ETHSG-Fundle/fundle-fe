"use client";

import Gallery from "@/components/Gallery";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Contract } from "ethers";
import erc20Abi from "../../ABIs/erc20.abi.json";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { addresses } from "@/constants/addresses";
import donationManagerAbi from "../../ABIs/BeneficiaryDonationManager.abi.json";
import { toUSDString } from "../utils/web3utils";

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

  // Values
  const [usdcBalance, setUsdcBalance] = useState<string | undefined>("test");
  const [inputValue, setInputValue] = useState<string>("");
  const [totalDonations, setTotalDonations] = useState<BigInt>(BigInt(0));

  // Contracts
  const [usdcContract, setUsdcContract] = useState<Contract>();
  const [donationManagerContract, setDonationManagerContract] =
    useState<Contract>();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected

    const getUSDCBalance = async () => {
      if (wallet?.provider) {
        // if using ethers v6 this is:
        let provider = new ethers.BrowserProvider(wallet.provider, "any");
        let signer = await provider.getSigner();

        const internalUsdcContract = new Contract(
          "0x254d06f33bDc5b8ee05b2ea472107E300226659A",
          erc20Abi,
          signer
        );

        const donationManagerContract = new Contract(
          addresses.donationManager,
          donationManagerAbi.abi,
          signer
        );

        setUsdcContract(internalUsdcContract);
        setDonationManagerContract(donationManagerContract);

        const retrievedUsdcBalance = await internalUsdcContract.balanceOf(
          wallet.accounts[0].address
        );

        setUsdcBalance(retrievedUsdcBalance.toString());
      }
    };

    getUSDCBalance();
  }, [wallet]);

  useEffect(() => {
    const getTotalDonationsAmount = async () => {
      if (usdcContract) {
        const totalDonationsAmount = await usdcContract.balanceOf(
          addresses.donationManager
        );
        setTotalDonations(totalDonationsAmount);
      }
    };
    getTotalDonationsAmount();
  }, [usdcContract]);

  const depositHandler = async () => {
    const approveAmount = async () => {
      if (usdcContract) {
        try {
          console.log("test", inputValue);
          await usdcContract.approve(
            addresses.donationManager,
            Number(parseFloat(inputValue) * Math.pow(10, 6))
          );
        } catch (e) {
          // console.log(e);
        }
      }
    };

    const donateAmount = async () => {
      if (donationManagerContract) {
        try {
          console.log("test", inputValue);
          await donationManagerContract.depositForEpochDistribution(
            Number(parseFloat(inputValue) * Math.pow(10, 6))
          );
        } catch (e) {
          // console.log(e);
        }
      }
    };

    await approveAmount();
    await donateAmount();
  };

  // JSX
  const banner = (
    <div className="flex flex-col bg-red-light p-8 my-5 rounded-md">
      <h1>Total Donations: ${toUSDString(totalDonations)}</h1>
      <p>
        Not sure who to donate to? Donate directly to the pool and let the
        community decide where your funds go!
      </p>
      <p>Your USDC balance: {usdcBalance}</p>
      <div className="mt-4 flex-col flex items-start gap-4">
        <Input
          className="w-96"
          placeholder="eg. 1000 USDC"
          unit="usdcsss"
          onChange={(value) => {
            setInputValue(value);
          }}
        ></Input>
        <Button title="Donate" onClick={depositHandler} />
      </div>
    </div>
  );

  return (
    <div className="mt-6">
      <section className="ml-8">
        <h1>Accredited Projects </h1>
        <p>Donate to your favourite causes!</p>
      </section>
      <section>{banner}</section>
      <Gallery />
    </div>
  );
}
