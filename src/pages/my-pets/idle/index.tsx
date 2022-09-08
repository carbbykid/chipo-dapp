import TitleBar from "components/layout/TitleBar";
import PetCard from "components/page/my-pets-ide/PetCard";
import type { NextPage } from "next";
import Head from "next/head";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>ChiPoPo</title>
        <meta name="description" content="ChiPoPo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleBar title="MY PETS > IDE" />
      <div className="flex flex-wrap gap-[55px] justify-center">
        {dataFake.map((data, idx) => (
          <PetCard key={idx} data={data} />
        ))}
      </div>
    </>
  );
};

export default Index;

const dataFake = [
  {
    imgURL: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "LEGENDARY",
  },
];
