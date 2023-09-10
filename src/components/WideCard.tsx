import React from "react";
import Image from "next/image";
import coin from "../assets/coin.png";

export default function WideCard({
  title,
  description,
  bigStat,
  stat1,
  stat2,
}: {
  title: string;
  description: string;
  bigStat: string;
  stat1: string;
  stat2: string;
}) {
  return (
    <div className="flex justify-center  w-3/5 bg-red-light rounded-md p-8">
      <div className="w-3/5 m-2">
        <div className="flex items-end">
          <Image src={coin} alt="icon" className="w-20 -ml-2"/>
          <div className="text-4xl ml-2 mb-2">{title}</div>
        </div>
        <p className="mt-4">{description}</p>
      </div>
      <div className="w-1/3 ml-16">
        <h1>{bigStat}</h1>
        <div className="text-xl font-display mt-12">Stats Title</div>
        <div className="flex w-3/5">
          <div>Some Stats </div>
          <div className="grow" />
          <div>{stat1}</div>
        </div>
        <div className="flex w-3/5">
          <div>Some Stats: </div>
          <div className="grow" />
          <div>{stat2}</div>
        </div>
      </div>
    </div>
  );
}
