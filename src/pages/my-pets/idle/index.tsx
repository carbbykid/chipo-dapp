import TitleBar from "components/layout/TitleBar";
import NumberInputSpinner from "components/page/mint-unicorn/NumberInputSpinner";
import type { NextPage } from "next";
import Head from "next/head";
import getLayersByTokenIndex from "../../../engine";
import layers from "../../../../layers/layer.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,

  useWaitForTransaction,
  useSigner,
  useContract
} from 'wagmi';
import { useCallback, useEffect, useMemo, useState } from "react";
import ABI_AUNI from "../../../../contracts/tAquaUnicorn";
import ABI_NFT from "../../../../contracts/tAquaUnicornNFT";
import { BigNumber } from "ethers";
import Image from 'next/image';
import PetCard from "components/page/my-pets-ide/PetCard";


const AUNIAddress ="0x1e5E4AdfE4cfcc68b8b54445280AFfe37c83607A";
const NFTAddress = "0xEBFD82e5f296e0ba6D0464cEA1c70e9DEe8DE808";

const Index: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { isConnected,address } = useAccount();
  const [amount, setAmount] = useState(1);
  const [tokenIds, setTokenIds] = useState<Array<number>>([]);

  const {data: singer} = useSigner();
  const contract = useContract({
    addressOrName:NFTAddress,
    contractInterface:ABI_NFT.abi,
    signerOrProvider:singer
  });

  const {
    data: balance
  } = useContractRead({
    cacheOnBlock:true,
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'balanceOf',
    args:[address],
  });

  const fetchToken = useCallback(async()=>{
    try{
      if(!contract || !address || !balance) {return null;} else if(isConnected){
          const ids = await Promise.all(new Array(BigNumber.from(balance?._hex).toNumber()).fill(null).map((_, i) => i).map(async(id)=> {
          const tokenId = await contract?.tokenOfOwnerByIndex(address,id);
          return BigNumber.from(tokenId._hex).toNumber();
        }
        ));
        setTokenIds(ids);
      }
    }catch(e){
      // console.log(e);
    }
    
  },[address,contract,balance,isConnected]);


  useEffect(()=>{
    if(!balance) return;
    fetchToken();
  },[address,contract,balance,fetchToken]);


  const listNFT  = useMemo(()=>{
    return tokenIds.map(index =>{
      return {
        images:getLayersByTokenIndex(layers,index),
        id:index,
        rarity:"COMMON",
      };
    });
  },[tokenIds]);


  return (
    <>
     
      <TitleBar title="MY PETS > IDE" />
      <div className="flex flex-wrap gap-[55px] justify-center">
        {listNFT.map((data, idx) => (
          <PetCard key={idx} data={data} />
        ))}
      </div>
    </>
  );
};

export default Index;

const dataFake = [
  {
    imgURL: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "LEGENDARY",
  },
  {
    imgURL: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "LEGENDARY",
  },
];
