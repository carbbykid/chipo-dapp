import TitleBar from "components/layout/TitleBar";
import MainInfo from "components/page/dashboard/MainInfo";
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
