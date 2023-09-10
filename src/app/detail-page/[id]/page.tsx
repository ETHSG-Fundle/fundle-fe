"use client";
import React from "react";
import Image from "next/image";
import ProgressBar from "@/components/ProgressBar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { BeneficiaryViewModel, dummyData } from "@/constants/ViewModels";

export default function page({ params }: { params: { id: number } }) {
  const viewModel: BeneficiaryViewModel = dummyData[params.id];
  return (
    <div className="flex p-16">
      <div className="flex flex-col pr-16 w-3/5">
        <div className="flex justify-center">
          <Image
            className="w-full h-96 object-cover"
            src={viewModel.image}
            // width={500}
            // height={300}
            alt="test"
          />
        </div>
        <h1>About Us</h1>
        <p>
          This is some description about the organization that is not truncated.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="sticky top-32">
          <div className="bg-red rounded-tl-3xl rounded-tr-3xl px-8">
            <h1 className="text-white">Donate</h1>
          </div>
          <div className="bg-red-light rounded-bl-3xl rounded-br-3xl px-8 pb-8">
            <h1>{viewModel.name}</h1>
            <h1 className="font-body text-4xl font-medium">$78,374</h1>
            <p className="mb-4">raised from 325 donors</p>
            <ProgressBar percent={20} />
            <p>10% of donation pool</p>
            <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
            <p className="mb-2">Enter donation amount</p>
            <Input
              className={"w-full mb-4"}
              placeholder="eg. 1000 USDC"
              onChange={(c) => {
                console.log(`${c}`);
              }}
            ></Input>
            <Button className={"w-full"} title="Donate" isRounded={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
