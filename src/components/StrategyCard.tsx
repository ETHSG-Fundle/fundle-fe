import React, { useState } from "react";
import Image from "next/image";
import coin from "../assets/coin.png";
import Tabs from "./Tabs";
import Input from "./Input";
import Button from "./Button";
import { StrategyViewModel } from "@/constants/ViewModels";

export default function StrategyCard({
  viewModel,
  inputValue,
  activeTab,
  setActiveTab,
  setInputValue,
}: {
  viewModel: StrategyViewModel;
  inputValue: string;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  setInputValue: (value: string) => void;
}) {
  return (
    <div className="flex flex-col justify-center w-3/4 bg-red-light rounded-md p-8">
      <div className="flex items-end justify-center w-full text-3xl">
        <Image
          src={coin}
          width={60}
          height={60}
          alt="icon"
          className="-mb-2 mr-2"
        />
        {viewModel.name}
        <div className="grow" />
        <div className="font-display text-6xl">
          {viewModel.yieldPercentage}%
        </div>
      </div>
      <p className="ml-2 mt-2 text-sm italic">Ethereum Mainnet</p>
      <Tabs
        label1="Deposit"
        label2="Withdraw"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="font-display text-xl mt-4">
        Your Balance: {viewModel.balance} {viewModel.currency}
      </div>
      <div className="font-display text-xl mt-2">Yield Generated:</div>
      <div className="w-4/5 flex">
        Your Yield:
        <div className="grow" />
        {viewModel.userYield} {viewModel.currency}
      </div>
      <div className="w-4/5 flex">
        Total Yield:
        <div className="grow" />
        {viewModel.totalYield} {viewModel.currency}
      </div>

      <div className="my-6">{viewModel.description}</div>

      <Input unit="DAI" className="w-full -ml-3" onChange={setInputValue} />

      <Button
        className="mt-4"
        isRounded={true}
        title={activeTab === 0 ? "Deposit" : "Withdraw"}
      />
    </div>
  );
}
