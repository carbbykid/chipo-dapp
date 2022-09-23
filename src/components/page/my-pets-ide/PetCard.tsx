import TitleBar from "components/layout/TitleBar";
import NumberInputSpinner from "components/page/mint-unicorn/NumberInputSpinner";
import type { NextPage } from "next";
import Head from "next/head";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,

  useWaitForTransaction,
  useSigner,
  useContract
} from 'wagmi';
import { useEffect, useMemo, useState } from "react";
import ABI_AUNI from "../../../../contracts/tAquaUnicorn";
import Staking_NFT from "../../../../contracts/AquaUnicornStaking";
import ABI_NFT from "../../../../contracts/tAquaUnicornNFT";
import { BigNumber } from "ethers";
import Image from 'next/image';

import contractAddress from "../../../constants/contractAddress";
const AUNIAddress =contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress= contractAddress.StakingAddress;

const PetCard = ({ approved, handleSetAproved ,data }: {approved:any, handleSetAproved:any,data: any }): JSX.Element => {
  const { isConnected,address } = useAccount();
  const [tokenId , setTokenId] = useState(data?.id);
  const {
    config : approvalConfig
  } = usePrepareContractWrite({
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'setApprovalForAll',
    args:[StakingAddress,true]
  });
  const { data :dataApproval, isLoading : isApprovalLoading, isSuccess : isApprovalSuccess, write  :approval} = useContractWrite(approvalConfig);

  
 

  const {
   
    isSuccess: txSuccessArroval,
    // error: txErrorToken,
  } = useWaitForTransaction({
    hash: dataApproval?.hash,
  });

  const approvalSuccess = txSuccessArroval;



  const {
    config : stakeConfig,
 
  } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: 'stake',
    args: [tokenId],
  });
  const { data :dataStake, isLoading : isLoading, isSuccess : isSuccess, write  :stake} = useContractWrite(stakeConfig);



  const {
   
    isSuccess: txSuccessStake,
  } = useWaitForTransaction({
    hash: dataStake?.hash,
  });

  const stakeSuccess = txSuccessStake;

  if(!approved && approvalSuccess) {
    handleSetAproved(true);
  }


  return (
    <>
    {!stakeSuccess && (
      <div className="collections_preview__listItem w-[320px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] hover:bg-[#000033] ease-in duration-200">
    <div className="collections_preview__listItemImageBox">
     {data.images.map((img:any, idx :number) => (
      <img
        key={`image_${idx}`}
        className="w-[290px] h-[290px] border-[1px] border-aqua-pink rounded-[25px] top-[0] "
        src={img.path}
        alt="AQUA-DApp"
      />

     ))}
     </div>
      

      <div className="my-[20px]">
        <div className="flex justify-between">
          <div className="text-[25px]">ID</div>
          <div className="text-[25px] mb-[20px]">{data.id}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-[25px]">RANK</div>
          <div className="text-[25px]">{data.rarity}</div>
        </div>
      </div>

      <div className="flex justify-between">
        {approved  && (
        <button 
        disabled={!stake || isLoading || isSuccess}
        data-mint-loading={isLoading}
        data-mint-started={isSuccess}
        onClick={() => {
          stake?.();
        }} 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          {isLoading && 'Waiting for approval'}
          {(isSuccess && !stakeSuccess) && 'Staking...'}
          {stakeSuccess && 'Staked'}
          {!isLoading && !isSuccess && 'Stake'}
        </button>
        )}
        {!approved  && (
        <button
        disabled={!approval || isApprovalLoading || isApprovalSuccess || stakeSuccess}
        data-mint-loading={isApprovalLoading}
        data-mint-started={isApprovalSuccess}
        onClick={() =>
          approval?.()
        } 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]"
      >
       {isApprovalLoading && 'Waiting for approval'}
       {isApprovalSuccess && 'Aproval...'}
       {stakeSuccess  && 'Staked'}
       {!isApprovalLoading && !isApprovalSuccess && 'Approve'}
      </button>
        )}
        
        <button 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          Sell
        </button>
      </div>
    </div>
    )}
    </>
  );
};

export default PetCard;
