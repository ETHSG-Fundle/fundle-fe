import React from "react";

export default function Input({
  className,
  unit,
}: {
  className: string;
  unit?: string;
}) {
  return (
    <div className="flex w-full justify-center items-center">
      <input
        className={`border-2 border-gray h-12 rounded-md p-4 text-xl ${className}`}
      />
      {unit && <span className="-ml-12 font-display text-2xl">{unit}</span>}
    </div>
  );
}
