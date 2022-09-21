import TitleBar from "components/layout/TitleBar";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Index: NextPage = () => {
  const [valueForm, setValueForm] = useState({ address: "", nftId: "" });
  const handleSubmit = () => {
    console.log("submit");
  };

  const handleChangeValue = (e: any) => {
    setValueForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
  
      <TitleBar title="Transfer NFT" />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-[#130945] w-[935px] border-[3px] py-[98px] px-[175px] border-aqua-pink rounded-[25px] bg-opacity-50 mx-auto my-0">
          <form onSubmit={handleSubmit} className="text-[25px]">
            <div className="mb-[52px] text-center">
              Enter address and nft id
            </div>
            <div>
              <input
                type="text"
                value={valueForm.address}
                name="address"
                placeholder="ADDRESS"
                onChange={handleChangeValue}
                className="w-full rounded-[15px] px-[10px] py-[5px] mb-[43px] text-[#333]"
              />
            </div>

            <div>
              <input
                type="text"
                value={valueForm.nftId}
                name="nftId"
                placeholder="NFT ID"
                onChange={handleChangeValue}
                className="w-full rounded-[15px] px-[10px] py-[5px] mb-[43px] text-[#333]"
              />
            </div>

            <button className="mx-auto my-0 block button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[70px]">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
