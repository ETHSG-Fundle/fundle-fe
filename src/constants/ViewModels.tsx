import { StaticImageData } from "next/image";
import wwfImage from "public/placeholder-wwf.jpg";
import unicefImage from "public/unicef.png";
import foodbankImage from "public/foodbank.png";
import sdaiImage from "public/sdai.png";

export interface BeneficiaryViewModel {
  id: number;
  name: string;
  description: string;
  image: StaticImageData;
}

export interface StrategyViewModel {
  id: number;
  name: string;
  currency: string;
  image: StaticImageData | string;
  yieldPercentage: number;
  balance: number;
  userYield: number;
  totalYield: number;
  description: string;
}

export const dummyData: BeneficiaryViewModel[] = [
  {
    id: 0,
    name: "World Wildlife Fund",
    description:
      "Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
    image: wwfImage,
  },
  {
    id: 1,
    name: "UNICEF",
    description:
      "UNICEF is mandated by the United Nations General Assembly to advocate for the protection of children's rights, to help meet their basic needs and to expand their opportunities to reach their full potential.",
    image: unicefImage,
  },
  {
    id: 2,
    name: "Food Bank Singapore",
    description: "To End Food Insecurity in All Forms in Singapore.",
    image: foodbankImage,
  },
];

export const strategyDummyData: StrategyViewModel[] = [
  {
    id: 0,
    name: "sDai",
    currency: "DAI",
    image: sdaiImage,
    yieldPercentage: 0.5,
    balance: 100,
    userYield: 0.5,
    totalYield: 5,
    description: "sDAI is a yield generating strategy for DAI.",
  },
  {
    id: 1,
    name: "fUSDC - Pendle YT",
    currency: "USDC-YT",
    image:
      "https://storage.googleapis.com/stage-pendle-bucket-a/images/uploads/1dfb3910-475d-4f22-9180-22a9c6e54674.svg",
    yieldPercentage: 0.5,
    balance: 100,
    userYield: 0.5,
    totalYield: 5,
    description: "PENDLE provides risk free yield on the underlying asset.",
  },
];
