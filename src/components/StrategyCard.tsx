import React, { useState } from "react";
import Image from "next/image";
import coin from "../assets/coin.png";
import Tabs from "./Tabs";
import Input from "./Input";
import Button from "./Button";
import { act } from "react-dom/test-utils";

export default function StrategyCard({
  title,
  description,
  bigStat,
  stat1,
  stat2,
  activeTab,
  setActiveTab,
  balance,
}: {
  title: string;
  description: string;
  bigStat: string;
  stat1: string;
  stat2: string;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  balance: number;
}) {
  return (
    <div className="flex flex-col justify-center w-1/4 bg-red-light rounded-md p-8">
      <div className="flex items-end justify-center w-full text-2xl">
        <Image src={coin} width={60} height={60} alt="icon" className="-mb-1" />
        {title}
        <div className="grow" />
        <div className="font-display text-6xl">{bigStat}</div>
      </div>
      <Tabs
        label1="Deposit"
        label2="Withdraw"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="font-display text-xl mt-4">Your Balance: {balance}</div>
      <div className="font-display text-xl mt-2">Yield Generated: </div>
      <div>Your Yield: {stat1}</div>
      <div>Total Yield: {stat2}</div>

      <div className="mb-6">{description}</div>

      <Input unit="DAI" className="w-full -ml-3" />

      <Button
        className="mt-4"
        isRounded={true}
        title={activeTab === 0 ? "Deposit" : "Withdraw"}
      />
    </div>
  );
}
