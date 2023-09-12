"use client";

import StrategyCard from "@/components/StrategyCard";
import React, { useEffect, useState } from "react";
import { StrategyViewModel, strategyDummyData } from "@/constants/ViewModels";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import ERC4626Abi from "../../ABIs/ERC4626Strategy.json";
import { ethers, Contract } from "ethers";
import { reduceDecimals, toUSDString } from "../utils/web3utils";
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
  const [totalYield, setTotalYield] = useState<number[]>([0.5, 0.5]);
  const [isLoading, setIsLoading] = useState<boolean[]>([false, false]);
  const [shouldRefetchDonationAmounts, setShouldRefetchDonationAmounts] =
    useState<boolean>(true);

  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  useEffect(() => {
    // If the wallet has a provider than the wallet is connected

    const getSdaiBalance = async () => {
      if (wallet?.provider) {
        await setChain({ chainId: "0x5" });
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

        const internalUnderlyingSdaiLPPromise: Promise<bigint> =
          internalSdaiStrategyContract.balanceOf(wallet.accounts[0].address);
        const internalCurrentSharesAndUnderlyingStakePromise: Promise<{
          0: bigint;
          1: bigint;
        }> = internalSdaiStrategyContract.getCurrentSharesAndUnderlyingStake(
          wallet.accounts[0].address
        );
        const [internalUnderlyingSdaiLP, { 0: _, 1: internalUnderlying }] =
          await Promise.all([
            internalUnderlyingSdaiLPPromise,
            internalCurrentSharesAndUnderlyingStakePromise,
          ]);
        const rawInternalTotalYield =
          internalUnderlying - internalUnderlyingSdaiLP;
        const internalTotalYield = reduceDecimals(rawInternalTotalYield, 18);
        setTotalYield([internalTotalYield, 0.5]);
      }
    };

    const performAction = async () => {
      await getSdaiBalance();
      setShouldRefetchDonationAmounts(false);
    };
    performAction();
  }, [wallet, setChain, shouldRefetchDonationAmounts]);

  const primaryActionHandler = async () => {
    const depositAmountNumber = String(
      BigInt(parseFloat(inputValue1) * 100) * BigInt(Math.pow(10, 16))
    );
    const deposit = async () => {
      setIsLoading([true, false]);
      try {
        const tx = await daiContract?.approve(
          addresses.sdaiStrategyContract,
          depositAmountNumber
        );

        await tx.wait();

        let depositTx = await sdaiStrategyContract?.deposit(
          addresses.daiContract,
          depositAmountNumber
        );

        await depositTx.wait()
        
        setIsLoading([false, false]);
      } catch (e) {
        setIsLoading([false, false]);
      }
    };

    const withdraw = async () => {
      setIsLoading([true, false]);
      try {
        const tx = await sdaiStrategyContract?.withdraw(
          addresses.daiContract,
          depositAmountNumber
        );
        await tx.wait();
        setIsLoading([false, false]);
      } catch (e) {
        setIsLoading([false, false]);
      }
    };

    const performAction = async () => {
      if (activeTab1 === 0) {
        await deposit();
        setShouldRefetchDonationAmounts(true);
      } else if (activeTab1 === 1) {
        await withdraw();
        setShouldRefetchDonationAmounts(true);
      }
    };

    performAction();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-8">Farm 🌱</h1>
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
            userBalance={toUSDString(balances[strategy.id], 18)}
            depositedBalance={toUSDString(depositedBalances[strategy.id], 18)}
            depositHandler={primaryActionHandler}
            userYield={totalYield[strategy.id]?.toFixed(2)}
            isLoading={isLoading[strategy.id]}
          />
        ))}
      </div>
    </div>
  );
}
