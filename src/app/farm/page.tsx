"use client";

import StrategyCard from "@/components/StrategyCard";
import React, { use, useState } from "react";
import { StrategyViewModel, strategyDummyData } from "@/constants/ViewModels";

export default function Page() {
  const [inputValue1, setInputValue1] = useState("0");
  const [inputValue2, setInputValue2] = useState("0");
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <h1>Farm</h1>
      <div className="grid grid-cols-2 w-2/3 place-items-center gap-x-0">
        {strategyDummyData.map((strategy: StrategyViewModel) => (
          <StrategyCard
            key={strategy.id}
            viewModel={strategy}
            inputValue={strategy.id === 0 ? inputValue1 : inputValue2}
            setInputValue={strategy.id === 0 ? setInputValue1 : setInputValue2}
            activeTab={strategy.id === 0 ? activeTab1 : activeTab2}
            setActiveTab={strategy.id === 0 ? setActiveTab1 : setActiveTab2}
          />
        ))}
      </div>
    </div>
  );
}
