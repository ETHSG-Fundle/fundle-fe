import React from "react";
import Card from "./Card";
import { useRouter } from 'next/navigation'


export default function Gallery() {

  const router = useRouter()

  const primaryAction = () => {
    router.push("/detail-page")
  };
  const secondaryAction = () => {};
  const dummyData = [
    {
      title: "Card Title",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      primaryActionTitle: "Button",
      secondaryActionTitle: "Button",
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
    },
    {
      title: "Card Title 2",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      primaryActionTitle: "Button",
      secondaryActionTitle: "Button",
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
    },
    {
      title: "Card Title 3",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      primaryActionTitle: "Button",
      secondaryActionTitle: "Button",
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
    },
    {
      title: "Card Title 4",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      primaryActionTitle: "Button",
      secondaryActionTitle: "Button",
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
    },
    {
      title: "Card Title 5",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      primaryActionTitle: "Button",
      secondaryActionTitle: "Button",
      primaryAction: primaryAction,
      secondaryAction: secondaryAction,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-x-0 gap-y-8">
      {dummyData.map((data) => (
        <Card {...data} key={data.title} />
      ))}
    </div>
  );
}
