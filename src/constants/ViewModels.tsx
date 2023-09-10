import { StaticImageData } from "next/image";
import wwfImage from "public/placeholder-wwf.jpg";

export interface BeneficiaryViewModel {
  id: number;
  name: string;
  description: string;
  image: StaticImageData;
}

export const dummyData: [BeneficiaryViewModel] = [
  {
    id: 0,
    name: "World Wildlife Fund",
    description:
      "Our mission is to conserve nature and reduce the most pressing threats to the diversity of life on Earth.",
    image: wwfImage,
  },
];
