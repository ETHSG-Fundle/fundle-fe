"use client";

import StrategyCard from "@/components/StrategyCard";
import React, { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <h1>Farm</h1>
      <StrategyCard
        title="sDai"
        description="this is a description for the strategy"
        stat1="0.5%"
        stat2="5%"
        bigStat="10%"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        balance={100}
      />
    </div>
  );
}
