import React from "react";

export default function Tabs({
  label1,
  label2,
  activeTab,
  setActiveTab,
}: {
  label1: string;
  label2: string;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}) {
  const activeStyle =
    "bg-red h-full rounded-full flex items-center cursor-pointer w-1/2 justify-center";
  const inactiveStyle =
    "h-full rounded-full flex items-center cursor-pointer w-1/2 justify-center";
  return (
    <div className="flex justify-center items-center bg-gray rounded-full h-12 text-sm text-white p-2 mt-4">
      <div
        className={activeTab === 0 ? activeStyle : inactiveStyle}
        onClick={() => setActiveTab(0)}
      >
        {label1}
      </div>
      <div
        className={activeTab === 1 ? activeStyle : inactiveStyle}
        onClick={() => setActiveTab(1)}
      >
        {label2}
      </div>
    </div>
  );
}
