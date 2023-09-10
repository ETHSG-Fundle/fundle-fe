"use client";

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
      <div className="flex flex-col items-start w-1/2">
        <p className="mt-6 font-bold text-xl">Add your organization details</p>
        <p>Organization Name</p>
        <Input className="w-full" onChange={() => {}} />
        <p>Description</p>
        <Input className="w-full" onChange={() => {}} />
      </div>
    </div>
  );
}
