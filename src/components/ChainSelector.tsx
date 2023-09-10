import React from "react";

export default function ChainSelector({
  labels,
  activeTab,
  setActiveTab,
}: {
  labels: string[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
}) {
  const activeStyle =
    "bg-red h-full rounded-full flex items-center cursor-pointer w-1/3 justify-center";
  const inactiveStyle =
    "h-full rounded-full flex items-center cursor-pointer w-1/3 justify-center";
  return (
    <div className="flex justify-center items-center bg-gray rounded-full h-12 text-sm text-white p-2 my-4">
      <div
        className={activeTab === 0 ? activeStyle : inactiveStyle}
        onClick={() => setActiveTab(0)}
      >
        {labels[0]}
      </div>
      <div
        className={activeTab === 1 ? activeStyle : inactiveStyle}
        onClick={() => setActiveTab(1)}
      >
        {labels[1]}
      </div>
      <div
        className={activeTab === 2 ? activeStyle : inactiveStyle}
        onClick={() => setActiveTab(2)}
      >
        {labels[2]}
      </div>
    </div>
  );
}
