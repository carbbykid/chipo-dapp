import TitleBar from "components/layout/TitleBar";
import NumberInputSpinner from "components/page/mint-unicorn/NumberInputSpinner";
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
      <TitleBar title="Mint Unicorn" />
      <div className="relative flex -mt-[140px]">
        <div className="absolute -left-[40px] w-[936px] h-[929px]">
          <div className="relative w-full h-full">
            <img
              className="w-[879px] left-1/2 -translate-x-1/2 absolute z-[5]"
              src="images/mint-unicorn/mint-domdom.png"
              alt="aqua-dapp"
            />
            <img
              className="w-[936px] bottom-[238px] absolute z-[4]"
              src="images/mint-unicorn/mint-before-cloud.png"
              alt="aqua-dapp"
            />
            <img
              className="w-[307px] absolute left-1/2 -translate-x-1/2 bottom-[213px] z-[3]"
              src="images/mint-unicorn/mint-egg.png"
              alt="aqua-dapp"
            />
            <img
              className="w-[774px] left-1/2 -translate-x-1/2 bottom-[16px] absolute z-[2]"
              src="images/mint-unicorn/mint-after-cloud.png"
              alt="aqua-dapp"
            />
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="pt-[140px] flex-1 relative z-10 mr-[60px] mb-[40px]">
          <h3 className="text-[40px] mb-[33px]">UNICORN EGGS</h3>
          <p className="text-[25px] mb-[31px] leading-[30px]">
            - Each Unicorn Egg costs 10,000 AUNI <br />- Rarity Level Ratio:
          </p>
          <table className="w-full text-[25px] mb-[31px] bg-[#130945] border-separate border-spacing-0 border-[3px] p-[18px] border-aqua-pink rounded-[15px] bg-opacity-50">
            <tbody className="text-center">
              <tr>
                <td className="col-primary">COMMON</td>
                <td className="col-secondary">60%</td>
              </tr>
              <tr>
                <td className="col-primary">RARE</td>
                <td className="col-secondary">20%</td>
              </tr>
              <tr>
                <td className="col-primary">SUPER RARE</td>
                <td className="col-secondary">10%</td>
              </tr>
              <tr>
                <td className="col-primary">EPIC</td>
                <td className="col-secondary">4%</td>
              </tr>
              <tr>
                <td className="col-primary">SUPER EPIC</td>
                <td className="col-secondary">3%</td>
              </tr>
              <tr>
                <td className="col-primary">LEGENDARY</td>
                <td className="col-secondary">2%</td>
              </tr>
              <tr>
                <td className="col-primary">LEGEND</td>
                <td className="col-secondary">0.9%</td>
              </tr>
              <tr>
                <td className="col-primary border-b-0">SUPREME</td>
                <td className="col-secondary border-b-0">0.1%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[25px] mb-[31px]">
            How many Unicorn eggs do you want to buy?
          </p>
          <NumberInputSpinner min={1} max={10} />
          <p className="text-[25px] mb-[35px] text-center">
            MAXIMUM QUANTITY 10
          </p>
          <button className="button text-[48px] border-[2px] rounded-[15px] py-[10px] px-[20px] mx-auto my-0 block text-center">
            MINT UNICORN
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
