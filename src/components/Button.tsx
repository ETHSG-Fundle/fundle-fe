import React from "react";

export default function Button({
  title,
  isSecondary,
  isRounded,
  className,
  onClick,
}: {
  title: string;
  isSecondary?: boolean;
  isRounded?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const primaryButtonStyle =
    "bg-red hover:bg-red-hover active:bg-red-active text-white";
  const secondaryButtonStyle =
    "bg-white hover:bg-red-light active:bg-red-active";

  return (
    <button
      onClick={onClick}
      className={`${
        isRounded ? "rounded-full" : "rounded-md"
      } border-2 border-red py-2 px-8 transition active:transition-none ${className} ${
        isSecondary ? secondaryButtonStyle : primaryButtonStyle
      }`}
    >
      {title}
    </button>
  );
}
