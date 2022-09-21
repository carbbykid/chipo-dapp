import TitleBar from "components/layout/TitleBar";
import MainInfo from "components/page/dashboard/MainInfo";
import type { NextPage } from "next";


const Index: NextPage = () => {
  return (
    <>
    
      <TitleBar title="Dashboard" />
      <div className="flex gap-[90px] flex-wrap justify-center">
        <MainInfo title="AUNI BALANCE" value={"0.00"} />
        <MainInfo title="EARN REWARD BUSD" value={"$ 0"} />
        <MainInfo title="AUNI PRICE" value={"$ 0"} />
        <MainInfo title="NFT HOLDING" value={"0"} />
        <MainInfo title="TOLAL NFTS MINTED" value={"0"} />
        <MainInfo title="WALLET BALANCE" value={"3.62 BNB"} />
      </div>
    </>
  );
};

export default Index;
