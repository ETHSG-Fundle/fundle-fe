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
    "bg-red h-full rounded-full p-4 px-8 flex items-center cursor-pointer";
  const inactiveStyle =
    "h-full rounded-full p-4 px-8 flex items-center cursor-pointer -m-2";
  return (
    <div className="flex justify-center items-center bg-gray rounded-full h-10 text-sm text-white">
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
