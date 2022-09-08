import TitleBar from "components/layout/TitleBar";
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
      <TitleBar title="Transfer NFT" />
    </>
  );
};

export default Index;
