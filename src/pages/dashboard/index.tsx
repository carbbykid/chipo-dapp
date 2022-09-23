import TitleBar from "components/layout/TitleBar";
import MainInfo from "components/page/dashboard/MainInfo";
import type { NextPage } from "next";
import { useAccount, useBalance, useContractRead } from "wagmi";

import contractAddress from "../../constants/contractAddress";
import ABI_AUNI from "../../../contracts/tAquaUnicorn";
import ABI_NFT from "../../../contracts/tAquaUnicornNFT";
import STAKING_NFT from "../../../contracts/AquaUnicornStaking";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
const AUNIAddress =contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress= contractAddress.StakingAddress;
import {Decimal} from "decimal.js";


const Index: NextPage = () => {
  const { isConnected,address } = useAccount();
  const { data: balanceBNB, isSuccess } = useBalance({
    addressOrName:address,
    // watch:true
  });
  // console.log("balanceBNB",balanceBNB);


  const {
    data: balance
  } = useContractRead({
    watch:true,
    addressOrName: AUNIAddress,
    contractInterface: ABI_AUNI.abi,
    functionName: 'balanceOf',
    args:[address]
  });

  const {
    data: balanceNFT
  } = useContractRead({
    watch:true,
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'balanceOf',
    args:[address]
  });

  const {
    data: rewards
  } = useContractRead({
    watch:true,
    addressOrName: StakingAddress,
    contractInterface: STAKING_NFT.abi,
    functionName: 'getAllRewardedToken',
    args:[address]
  });

  // console.log("rewards",new Decimal(BigNumber.from(rewards?._hex || 0).toString()).div(Math.pow(10, 18)));

  const {
    data: totalSupply
  } = useContractRead({
    watch:true,
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'totalSupply',
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (

    <>
      {mounted && (
        <>
         <TitleBar title="Dashboard" />
         <div className="flex gap-[90px] flex-wrap justify-center">
           <MainInfo title="AUNI BALANCE" value={BigNumber.from(balance?._hex || 0).div(BigNumber.from(10).pow(18)).toString()} />
           <MainInfo title="EARN REWARD BUSD" value={new Decimal(BigNumber.from(rewards?._hex || 0).toString()).div(Math.pow(10, 18)).toString().substring(0,5)} />
           <MainInfo title="AUNI PRICE" value={"$ 0.2"} />
           <MainInfo title="NFT HOLDING" value={BigNumber.from(balanceNFT?._hex|| 0).toString()} />
           <MainInfo title="TOLAL NFTS MINTED" value={BigNumber.from(totalSupply?._hex|| 0).toString()} />
           <MainInfo title="WALLET BALANCE" value={balanceBNB?.formatted.slice(0,5) + " BNB"} />
         </div>
         </>
      )}
     
    </>
  );
};

export default Index;
