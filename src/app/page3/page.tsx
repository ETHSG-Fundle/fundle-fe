"use client";

import Tabs from "@/components/Tabs";
import WideCard from "@/components/WideCard";
import React, { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col justify-center items-center">
      <Tabs
        label1="TEST 1"
        label2="TEST 2"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 0 ? "TEST 1" : "TEST 2"}
      <WideCard
        title="Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
        stat1="10%"
        stat2="10000%"
        bigStat="1.9%"
      />
    </div>
  );
}
