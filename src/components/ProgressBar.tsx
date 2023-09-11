import React from "react";

export default function ProgressBar({ percent }: { percent: string }) {
  return (
    <div className="w-full bg-red-medium rounded-full h-6">
      <div
        className={`bg-red h-6 rounded-full`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
