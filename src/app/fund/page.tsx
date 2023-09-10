"use client";

import Gallery from "@/components/Gallery";
import React from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page() {
  const banner = (
    <div className="flex flex-col bg-red-light p-8 my-5 rounded-md">
      <h1>Total Donations: $200,000</h1>
      <p>
        Not sure who to donate to? Donate directly to the pool and let the
        community decide where your funds go to!
      </p>
      <div className="mt-4 flex-col flex items-start gap-4">
        <Input
          className="w-96"
          placeholder="eg. 1000 USDC"
          unit="usdcsss"
          onChange={(value) => {}}
        ></Input>
        <Button title="Donate" />
      </div>
    </div>
  );
  return (
    <div className="mt-6">
      <section className="ml-8">
        <h1>Accredited Projects</h1>
        <p>
          The distribution of sponsored pool will depend on how many people
          chipped in for a project and how much they gave.
        </p>
      </section>
      <section>{banner}</section>
      <Gallery />
    </div>
  );
}
