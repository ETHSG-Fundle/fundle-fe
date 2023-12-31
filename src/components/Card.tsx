import React from "react";
import Button from "./Button";
import Image from "next/image";

import placeholderSVG from "../assets/placeholder.svg";
import { BeneficiaryViewModel } from "@/constants/ViewModels";

export default function Card({
  viewModel,
  onClick,
}: {
  viewModel: BeneficiaryViewModel;
  onClick: (id: number) => void;
}) {
  const onClickHandler = () => {
    onClick(viewModel.id);
  };
  return (
    <div
      className="flex flex-col items-center bg-red-light rounded-lg p-6 place-self-center w-5/6 hover:scale-105 hover:cursor-pointer transition active:bg-red-active"
      onClick={onClickHandler}
    >
      <div className="flex items-center w-full text-xl">
        <div className="font-bold">{viewModel.name}</div>
        <div className="grow" />
        <div>❤️</div>
      </div>
      <Image
        className="mx-6 mt-6 mb-4 object-cover h-48"
        src={viewModel.image}
        alt="placeholder"
        // height="100"
        // width=
        // fill={true}
      />
      <div className="line-clamp-2">{viewModel.description}</div>
      {/* <div className="flex space-x-2 mt-4">
        <Button
          title={secondaryActionTitle}
          isSecondary={true}
          onClick={secondaryAction}
        />
        <Button
          title={primaryActionTitle}
          onClick={primaryAction}
        />
      </div> */}
    </div>
  );
}
