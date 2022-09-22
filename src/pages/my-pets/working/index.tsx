import Pagination from "components/common/Pagination";
import TableCustom from "components/common/TableCustom";
import TitleBar from "components/layout/TitleBar";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import ABI_AUNI from "../../../../contracts/tAquaUnicorn";
import Staking_NFT from "../../../../contracts/AquaUnicornStaking";
import ABI_NFT from "../../../../contracts/tAquaUnicornNFT";

import getLayersByTokenIndex from "../../../engine";
import layers from "../../../../layers/layer.json";
import {Decimal} from "decimal.js";
const recordsPerPage = 4;



import contractAddress from "../../../constants/contractAddress";
import { useAccount, useContract, useContractRead, usePrepareContractWrite, useProvider, useSigner } from "wagmi";
import { BigNumber } from "ethers";
const AUNIAddress =contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress= contractAddress.StakingAddress;


const Index: NextPage = () => {
  
  const [listItems, setListItems] = useState<any>([]);
  const [stakingList, setStakingList] = useState<any>([]);
  const { isConnected,address } = useAccount();
  const provider = useProvider();
  const { data:signer } = useSigner();
  const stakingContract = useContract({
    addressOrName:StakingAddress,
    contractInterface:Staking_NFT.abi,
    signerOrProvider:signer || provider
  });
  const {
    data : tokenIds,
  } = useContractRead({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: 'getStakedTokens',
    args: [address],
  });

  // const {
  //   config : approvalConfig
  // } = usePrepareContractWrite({
  //   addressOrName: StakingAddress,
  //   contractInterface: Staking_NFT.abi,
  //   functionName: 'unstake',
  //   args:[StakingAddress,true]
  // });
  // const { data :dataApproval, isLoading : isApprovalLoading, isSuccess : isApprovalSuccess, write  :approval} = useContractWrite(approvalConfig);


  const getReward = useCallback(async (id :number)=>{
    try{
      if(!stakingContract || !address) return 0;
      const reward = await stakingContract?.getRewardedToken(address,id);
      return new Decimal(BigNumber.from(reward._hex).toString()).div(new Decimal(10).pow(18)).toFixed(3);
    }catch(e){
      console.log();
    };

  },[stakingContract,address]);


   
  const fetch = useCallback(async ()=>{
    if(!tokenIds || !tokenIds.length) return;
    const list = await Promise.all(tokenIds.map(async id => {
      return {
        images:getLayersByTokenIndex(layers,id),
        id : BigNumber.from(id._hex).toNumber(),
        rank:"COMMON",
        land:"Pellucidar",
        reward: await getReward(id)
      };
    })
    );
    setStakingList(list);
  },[tokenIds,getReward]);
  useEffect(()=>{
    fetch();
  },[tokenIds,fetch]);

  const router = useRouter();
  const page = useMemo(
    () => Number(router.query.page) || 1,
    [router.query.page],
  );
  const totalPages = Math.ceil(stakingList.length / recordsPerPage);
  const generateDataOnPage = useCallback((page: number, size: number) => {
    const offset = (page - 1) * size;

    if (offset + size > stakingList.length) {
      return stakingList.slice(offset, stakingList.length);
    } else {
      return stakingList.slice(offset, offset + size);
    }
  },[stakingList]);


  const loadListItem = useCallback(() => {
    setListItems(generateDataOnPage(page, recordsPerPage));
  }, [page,generateDataOnPage]);



  useEffect(() => {
    loadListItem();
  }, [loadListItem]);

  return (
    <>
  
      <TitleBar title="MY PETS > WORKING" />
      <div className="mb-[30px]">
        <TableCustom data={listItems} titleRow={titleRow} />
      </div>

      {listItems.length > 0 && (
        <Pagination
          totalPages={totalPages}
          maxVisibleButtons={3}
          recordsPerPage={recordsPerPage}
        />
      )}
    </>
  );
};

export default Index;

const titleRow = [
  { title: "PET", field: "pet" },
  { title: "ID", field: "id" },
  { title: "RANK", field: "rank" },
  { title: "LAND", field: "land" },
  { title: "REWARD(BUSD)", field: "reward" },
  {
    title: "FUNCTION",
    field: (id?: string, data?: any) => (
      <div className="flex justify-center gap-[40px]">
        <button className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
          CLAIM
        </button>
        <button className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
          UNSTAKE
        </button>
      </div>
    ),
  },
];
