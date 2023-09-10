"use client";

import Gallery from "@/components/Gallery";
import React from "react";
import Button from "@/components/Button";

export default function Page() {
  const banner = (
    <div className="flex bg-red-light p-8 my-5 rounded-md justify-between">
      <h1>Sponsored pool: $200,000</h1>
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
