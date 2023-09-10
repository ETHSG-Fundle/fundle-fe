"use client";
import React from "react";

export default function Input({
  className,
  onChange,
  placeholder,
  unit,
}: {
  className: string;
  onChange: (e: string) => void;
  placeholder?: string;
  unit?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="flex w-full justify-center items-center">
      <input
        className={`border-2 border-gray h-12 rounded-md p-4 text-xl ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {unit && <span className="-ml-12 font-display text-2xl">{unit}</span>}
    </div>
  );
}
