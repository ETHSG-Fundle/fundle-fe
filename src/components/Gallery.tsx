import React from "react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { dummyData } from "@/constants/ViewModels";

export default function Gallery() {
  const router = useRouter();

  const routeToDetailPage = (id: number) => {
    router.push(`/detail-page/${id}`);
  };

  return (
    <div className="grid grid-cols-4 gap-x-0 gap-y-8">
      {dummyData.map((data) => (
        <Card viewModel={data} key={data.id} onClick={routeToDetailPage} />
      ))}
    </div>
  );
}
