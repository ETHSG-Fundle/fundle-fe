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
    <div className="flex flex-col items-end">
      <input
        className={`border-2 border-gray h-12 rounded-md p-4 text-xl ${className}`}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {unit && (
        <span className="font-display text-2xl mr-4 -mt-10 ">{unit}</span>
      )}
    </div>
  );
}
