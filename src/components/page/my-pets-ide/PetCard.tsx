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


const AUNIAddress ="0x1e5E4AdfE4cfcc68b8b54445280AFfe37c83607A";
const NFTAddress = "0xEBFD82e5f296e0ba6D0464cEA1c70e9DEe8DE808";
const StakingAddress= "0xe6aeB3CB51f93C7b997Dd0EEFa59062977fc5Ad2";

const PetCard = ({ data }: { data: any }): JSX.Element => {
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
    data: isApprored
  } = useContractRead({
    cacheOnBlock:true,
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'isApprovedForAll',
    args:[address,StakingAddress]
  });

  const {
   
    isSuccess: txSuccessArroval,
    // error: txErrorToken,
  } = useWaitForTransaction({
    hash: dataApproval?.hash,
  });


  const {
    config : stakeConfig,
    error 
  } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: 'stake',
    args: [tokenId],
  });
  const { data :dataStake, isLoading : isLoading, isSuccess : isSuccess, write  :stake} = useContractWrite(stakeConfig);



  const {
   
    isSuccess: txSuccessStake,
    // error: txErrorToken,
  } = useWaitForTransaction({
    hash: dataStake?.hash,
  });

  const stakeSuccess = txSuccessStake;



  return (
    <div className="collections_preview__listItem w-[320px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] hover:bg-[#000033] ease-in duration-200">
    <div className="collections_preview__listItemImageBox">
     {data.images.map((img:any, idx :number) => (
       <>
      <img
        key={`image_${idx}`}
        className="w-[290px] h-[290px] border-[1px] border-aqua-pink rounded-[25px] top-[0] "
        src={img.path}
        alt="AQUA-DApp"
      />
      </>
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
        {(isApprored || txSuccessArroval) && (
        <button 
        disabled={!stake || isLoading || isSuccess}
        data-mint-loading={isLoading}
        data-mint-started={isSuccess}
        onClick={() => {
          setTokenId(data.id);
          stake?.();
        }} 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          {isLoading && 'Waiting for approval'}
          {isSuccess && 'Aproval...'}
          {!isLoading && !isSuccess && 'Stake'}
        </button>
        )}
        {!isApprored && (
        <button
        disabled={!approval || isApprovalLoading || isApprovalSuccess || stakeSuccess}
        data-mint-loading={isApprovalLoading}
        data-mint-started={isApprovalSuccess}
        onClick={() => approval?.()} 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]"
      >
       {isApprovalLoading && 'Waiting for approval'}
       {isApprovalSuccess && 'Aproval...'}
       {stakeSuccess  && 'Staked'}
       {!isApprovalLoading && !isApprovalSuccess && 'Appproval'}
      </button>
        )}
        
        <button 
        className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          Sell
        </button>
      </div>
    </div>
  );
};

export default PetCard;
