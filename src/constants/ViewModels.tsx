import { StaticImageData } from "next/image";
import wwfImage from "public/placeholder-wwf.jpg";
import unicefImage from "public/unicef.png";
import foodbankImage from "public/foodbank.png";

export interface BeneficiaryViewModel {
  id: number;
  name: string;
  description: string;
  image: StaticImageData;
}

<<<<<<< Updated upstream
export const dummyData: BeneficiaryViewModel[] = [
=======
export interface StrategyViewModel {
  id: number;
  name: string;
  image: StaticImageData;
  yieldPercentage: number;
  balance: number;
  userYield: number;
  totalYield: number;
  description: string;
}

export const dummyData: [BeneficiaryViewModel] = [
>>>>>>> Stashed changes
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

export const strategyDummyData : StrategyViewModel[] = [
  {
    id: 0,
    name: "sDai",
    image: wwfImage,
    yieldPercentage: 0.5,
    balance: 100,
    userYield: 0.5,
    totalYield: 5,
    description: "this is a description for the strategy",
  },
  {
    id: 1,
    name: "pendle?",
    image: wwfImage,
    yieldPercentage: 0.5,
    balance: 100,
    userYield: 0.5,
    totalYield: 5,
    description: "this is a description for the strategy",
  }
]