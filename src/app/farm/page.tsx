"use client";

import StrategyCard from "@/components/StrategyCard";
import React, { useEffect, useState } from "react";
import { StrategyViewModel, strategyDummyData } from "@/constants/ViewModels";
import { useConnectWallet } from "@web3-onboard/react";
import ERC4626Abi from "../../ABIs/ERC4626Strategy.json";
import { ethers, Contract } from "ethers";
import { toUSDString } from "../utils/web3utils";
import { addresses } from "@/constants/addresses";
import ERC20Abi from "../../ABIs/erc20.abi.json";

export default function Page() {
  const [inputValue1, setInputValue1] = useState("0");
  const [inputValue2, setInputValue2] = useState("0");
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);

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

  const [sdaiStrategyContract, setSdaiStrategyContract] = useState<Contract>();
  const [daiContract, setDaiContract] = useState<Contract>();
  const [daiBalance, setDaiBalance] = useState<BigInt>(BigInt(0));
  const [balances, setBalances] = useState<BigInt[]>([BigInt(0), BigInt(0)]);
  const [depositedBalances, setDepositedBalances] = useState<BigInt[]>([
    BigInt(0),
    BigInt(0),
  ]);
  // const [sdaiBalance, setSdaiBalance] = useState<BigInt>(BigInt(0));

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected

    const getSdaiBalance = async () => {
      if (wallet?.provider) {
        // if using ethers v6 this is:
        let provider = new ethers.BrowserProvider(wallet.provider, "any");
        let signer = await provider.getSigner();

        const internalSdaiStrategyContract = new Contract(
          addresses.sdaiStrategyContract,
          ERC4626Abi.abi,
          signer
        );
        setSdaiStrategyContract(internalSdaiStrategyContract);

        const internalDaiContract = new Contract(
          addresses.clonedDaiContract,
          ERC20Abi,
          signer
        );
        setDaiContract(internalDaiContract);

        const internalSdaiBalance =
          await internalSdaiStrategyContract.balanceOf(
            wallet.accounts[0].address
          );
        setDepositedBalances([internalSdaiBalance, BigInt(0)]);

        const internalDaiBalance = await internalDaiContract.balanceOf(
          wallet.accounts[0].address
        );
        setBalances([internalDaiBalance, BigInt(0)]);
      }
    };

    getSdaiBalance();
  }, [wallet]);

  const depositHandler = async () => {
    const depositAmountNumber = String(
      parseFloat(inputValue1) * Math.pow(10, 18)
    );
    try {
      await daiContract?.approve(addresses.sdaiStrategyContract, depositAmountNumber);
      console.log("dai contract approved")
      await sdaiStrategyContract?.deposit(
        addresses.daiContract,
        depositAmountNumber
      );
    } catch (e) {}
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8">Farm</h1>
      {`Want to donate without spending a single cent? Simply park your funds with us, and we'll do the rest!`}
      <div className="grid grid-cols-2 w-5/6 px-16 mt-4 place-items-start">
        {strategyDummyData.map((strategy: StrategyViewModel) => (
          <StrategyCard
            key={strategy.id}
            viewModel={strategy}
            inputValue={strategy.id === 0 ? inputValue1 : inputValue2}
            setInputValue={strategy.id === 0 ? setInputValue1 : setInputValue2}
            activeTab={strategy.id === 0 ? activeTab1 : activeTab2}
            setActiveTab={strategy.id === 0 ? setActiveTab1 : setActiveTab2}
            userBalance={balances[strategy.id].toString()}
            depositedBalance = {depositedBalances[strategy.id].toString()}
            depositHandler={depositHandler}
          />
        ))}
      </div>
    </div>
  );
}
