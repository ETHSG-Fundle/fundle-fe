import React from "react";
import { useState } from "react";

export default function Tooltip({
  content,
  children,
}: {
  content: string;
  children: any;
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };
  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="group">
      <p className="pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-red-active text-white">
        {content}
      </p>
      {children}
    </div>
  );
}
