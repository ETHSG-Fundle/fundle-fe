"use client";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import Icon from "../app/favicon.ico";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import type { TokenSymbol } from "@web3-onboard/common";

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

export default function NavBar() {
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
  const [ethersProvider, setProvider] =
    useState<ethers.BrowserProvider | null>();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
    }
  }, [wallet]);

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // if using ethers v6 this is:
      setProvider(new ethers.BrowserProvider(wallet.provider, "any"));
    }
  }, [wallet]);

  const connectButtonHandler = () => {
    if (wallet) {
      disconnect(wallet);
      setAccount(null);
    } else {
      connect();
    }
  };

  return (
    <div className="flex w-screen bg-red-light text-black py-4 px-12 items-center sticky top-0 z-10">
      <Link href="/" className="m-2">
        <Image src={Icon} width={50} height={50} alt="icon" />
      </Link>
      <div className="w-12" />
      <Link href="/fund" className="mx-6 hover:underline">
        Fund
      </Link>
      <Link href="/farm" className="mx-6 hover:underline">
        Farm
      </Link>
      <Link href="/register" className="mx-6 hover:underline">
        Register
      </Link>
      <div className="grow"></div>
      <Button
        className="w-48 text-ellipsis overflow-hidden	"
        title={wallet && account ? account.address : "Connect Wallet"}
        onClick={connectButtonHandler}
        isLoading={connecting}
      />
    </div>
  );
}
