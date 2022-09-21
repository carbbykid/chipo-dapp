import TitleBar from "components/layout/TitleBar";
import StakeCard from "components/page/stake-nft/StakeCard";
import type { NextPage } from "next";
import Head from "next/head";



const Index: NextPage = () => {
  
  return (
    <>

      <TitleBar title="STAKE NFT" />
      <div className="flex flex-wrap gap-[45px] justify-center">
        {dataFake.map((data, idx) => (
          <StakeCard key={idx} data={data} />
        ))}
      </div>
    </>
  );
};

export default Index;

const dataFake = [
  {
    title: "Pellucidar \n land",
    imgURL: "/images/stake-nft/land-1.png",
    rankInfo: "RANK COMMON",
    rewardInfo: "Reward 5-15 BUSD/24H",
  },
  {
    title: "NEVER \n land",
    imgURL: "/images/stake-nft/land-2.png",
    rankInfo: "RANK RARE & SUPER RARE",
    rewardInfo: "Reward 10-30 BUSD/24H",
  },
  {
    title: "Shangri-La \n land",
    imgURL: "/images/stake-nft/land-4.png",
    rankInfo: "RANK RARE & SUPER EPIC",
    rewardInfo: "Reward 2-50 BUSD/24H",
  },
  {
    title: "Middle Earth \n land",
    imgURL: "/images/stake-nft/land-5.png",
    rankInfo: "RANK LEGENDARY",
    rewardInfo: "Reward 35-70 BUSD/24H",
  },
  {
    title: "Narnia \n land",
    imgURL: "/images/stake-nft/land-6.png",
    rankInfo: "RANK LEGEND",
    rewardInfo: "Reward 50-90 BUSD/24H",
  },
  {
    title: "DREAM \n land",
    imgURL: "/images/stake-nft/land-2.png",
    rankInfo: "RANK SUPREME",
    rewardInfo: "Reward 70-120 BUSD/24H",
  },
];
