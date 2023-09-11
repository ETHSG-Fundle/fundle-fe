import Image, { StaticImageData } from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function MiniSelector({
  labels,
  images,
  activeTab,
  setActiveTab,
  isLoading,
}: {
  labels: string[];
  images: StaticImageData[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  isLoading: boolean;
}) {
  const activeStyle =
    "bg-red h-9 rounded-full flex items-center cursor-pointer w-1/3 justify-center text-white";
  const inactiveStyle =
    "h-full rounded-full flex items-center cursor-pointer w-1/3 justify-center text-red-light-medium";
  return (
    <div className="flex justify-center items-center bg-white rounded-full h-12 text-sm p-2 my-4 w-96">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <div
            className={activeTab === 0 ? activeStyle : inactiveStyle}
            onClick={() => setActiveTab(0)}
          >
            <Image src={images[0]} alt="icon" width={20} className="mr-2" />
          </div>
          <div
            className={activeTab === 1 ? activeStyle : inactiveStyle}
            onClick={() => setActiveTab(1)}
          >
            <Image src={images[1]} alt="icon" width={20} className="mr-2" />
          </div>
          <div
            className={activeTab === 2 ? activeStyle : inactiveStyle}
            onClick={() => setActiveTab(2)}
          >
            <Image src={images[2]} alt="icon" width={20} className="mr-2" />
          </div>
        </>
      )}
    </div>
  );
}
