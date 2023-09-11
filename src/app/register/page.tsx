"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/ChainSelector";
import Input from "@/components/Input";
import React, { useState } from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1>Be an Accredited Beneficiary</h1>
      <p className="w-1/2">
        Our NPOs go through a verification process by NVPC before they create an
        accredited wallet. For the requirements, please contact us at
        accreditation@nvpc.org
      </p>
      <p className="w-1/2 mt-6">
        Once your address has been whitelisted by NVPC, you can create an
        accredited wallet here:
      </p>
      <div className="flex flex-col items-center w-1/2">
        <p className="mt-6 mb-4 font-bold text-xl ">Add Your Organization Details</p>
        <div className="flex flex-col items-start">
          <p>Organization Name</p>
          <Input className="w-[750px] mb-4" onChange={() => {}} />
        </div>
        <div className="flex flex-col items-start">
          <p>Description</p>
          <textarea
            className="w-[750px] h-24 mb-4 p-4 border-2 border-gray rounded-md text-xl"
            onChange={() => {}}
          />
        </div>
      </div>
      <Button
        className="mt-8"
        title="Register"
        isRounded={true}
        onClick={() => {}}
      />
    </div>
  );
}
