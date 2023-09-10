import React from "react";
import Button from "./Button";
import Image from "next/image";

import placeholderSVG from "../assets/placeholder.svg";

export default function Card({
  title,
  description,
  primaryActionTitle,
  secondaryActionTitle,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  description: string;
  primaryActionTitle: string;
  secondaryActionTitle: string;
  primaryAction: () => void;
  secondaryAction: () => void;
}) {
  return (
    <div className="flex flex-col items-center bg-red-light rounded-lg p-6 place-self-center w-5/6 hover:scale-105 hover:cursor-pointer transition active:bg-red-active" onClick={primaryAction}>
      <div className="flex items-center w-full text-xl">
        <div>{title}</div>
        <div className="grow" />
        <div>❤️</div>
      </div>
      <Image
        className="mx-6 mt-16 mb-4"
        src={placeholderSVG}
        alt="placeholder"
      />
      <div>{description}</div>
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
