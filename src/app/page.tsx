"use client";
//libraries
import ethers from "ethers";
import { useRouter } from "next/navigation";

//components
import Button from "@/components/Button";
import Image from "next/image";
import Card from "@/components/Card";
import Gallery from "@/components/Gallery";
import worldImage from "public/world.png";
import coinImage from "public/coin.png";
import farmImage from "public/farm.png";

export default function Home() {
  const router = useRouter();

  const goToFund = () => {
    router.push("/fund");
  };

  const goToFarm = () => {
    router.push("/farm");
  };

  const landingSection = (
    <section className="flex h-[calc(100vh-76px)] items-center justify-between">
      <div className="max-w-lg mv-auto">
        <p className="-mb-3 font-light text-slate-700">Farm to Fund</p>
        <h1>Fundle</h1>
        <p className="font-light text-slate-500 mb-3">
          Tired of picking beneficiaries to support?
          <br />
          Want to donate for free?
          <br />
          {`With Fundle, we take your capital and earn yield on it, donating it
          quadratically to the community's favourite beneficiaries!`}
        </p>
        <div className="flex gap-2">
          <Button onClick={goToFund} title="Fund!" />
          <Button isSecondary={true} onClick={goToFarm} title="Farm!" />
        </div>
      </div>
      <Image
        className="-mr-16"
        src={worldImage}
        width={800}
        height={800}
        alt="test"
      />
    </section>
  );

  const banner = (
    <div className="flex bg-red-light p-8 my-5 rounded-md justify-between">
      <div className="mt-2 text-2xl font-light">
        <span className="font-bold">Are you an NPO? </span>
        Click here to register with us!
      </div>
      <Button title="Register!"></Button>
    </div>
  );
  const infoCard1 = (
    <div className="flex flex-col items-center max-w-[12rem]">
      <Image src={coinImage} width={100} height={100} alt="test" />
      <p className="text-center text-lg">Fund</p>
      <p className="text-sm text-slate-500 font-light text-center mb-4">
         With quadratic funding, small amounts have big impacts on the cause you are supporting.
      </p>
      <Button title="Fund Now!" isRounded={true} onClick={goToFund} />
    </div>
  );

  const infoCard2 = (
    <div className="flex flex-col items-center max-w-[12rem]">
      <Image src={farmImage} width={100} height={100} alt="test" />
      <p className="text-center text-lg">Farm</p>
      <p className="text-sm text-slate-500 font-light text-center mb-4">
        Give nothing but time. Treat Fundle like a savings account
        and you can help our NPOs without spending anything.
      </p>
      <Button title="Farm Now!" isRounded={true} onClick={goToFarm} />
    </div>
  );

  const firstSection = (
    <section className="flex flex-col items-center py-12">
      <h2>How You Can Make a Difference!</h2>
      <div className="flex py-4 justify-around w-full max-w-4xl">
        {infoCard1}
        {infoCard2}
      </div>
    </section>
  );

  const gallerySection = (
    <section className="flex flex-col items-center">
      <h2>Beneficiaries</h2>
      <p className="mb-12">Support your favourite benefiaries on Fundle!</p>
      <Gallery />
    </section>
  );

  return (
    <div className="flex flex-col px-16">
      {landingSection}
      {banner}
      {firstSection}
      {gallerySection}
    </div>
  );
}
