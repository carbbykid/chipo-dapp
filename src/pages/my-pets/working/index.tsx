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
import { Decimal } from "decimal.js";
const recordsPerPage = 4;

import contractAddress from "../../../constants/contractAddress";
import {
  useAccount,
  useContract,
  useContractRead,
  usePrepareContractWrite,
  useProvider,
  useSigner,
} from "wagmi";
import { BigNumber } from "ethers";
const AUNIAddress = contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress = contractAddress.StakingAddress;

const Index: NextPage = () => {
  // const [listItems, setListItems] = useState<any>([]);
  const [stakingList, setStakingList] = useState<any>([]);
  const [tokenIds, setTokenIds] = useState<any>([]);
  const [isUnstakeSuccess, setIsUnstakeSuccess] = useState();

  const { isConnected, address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const stakingContract = useContract({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    signerOrProvider: signer || provider,
  });

  const getStakedIds = useCallback(async () => {
    try {
      if (!stakingContract || !address) return;
      const ids = await stakingContract?.getStakedTokens(address);
      if (ids) setTokenIds([...ids]);
      // fetch();
    } catch (e) {
      //
    }
  }, [stakingContract, address]);

  // const reLoadIds = useCallback(() => {
  //   getStakedIds();
  // }, [getStakedIds]);

  useEffect(() => {
    getStakedIds();
  }, [getStakedIds]);

  // getStakedIds();

  const getReward = useCallback(
    async (id: number) => {
      try {
        if (!stakingContract || !address) return 0;
        const reward = await stakingContract?.getRewardedToken(address, id);
        return new Decimal(BigNumber.from(reward._hex).toString())
          .div(new Decimal(10).pow(18))
          .toFixed(3);
      } catch (e) {
        console.log();
      }
    },
    [address, stakingContract],
  );

  const fetch = useCallback(async () => {
    if (!tokenIds || !tokenIds.length) return;
    const list = await Promise.all(
      tokenIds.map(async (id: any) => {
        return {
          images: getLayersByTokenIndex(layers, id),
          id: BigNumber.from(id._hex).toNumber(),
          rank: "COMMON",
          land: "Pellucidar",
        };
      }),
    );
    setStakingList([...list]);
  }, [getReward, tokenIds]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const router = useRouter();
  const page = useMemo(
    () => Number(router.query.page) || 1,
    [router.query.page],
  );
  const totalPages = Math.ceil(mockData.length / recordsPerPage);

  const listItems = useMemo(() => {
    const offset = (page - 1) * recordsPerPage;
    if (offset + recordsPerPage > mockData.length) {
      return mockData.slice(offset, mockData.length);
    } else {
      return mockData.slice(offset, offset + recordsPerPage);
    }
  }, [page, mockData]);

  return (
    <>
      <TitleBar title="MY PETS > WORKING" />
      <div className="mb-[30px] w-[calc(100vw_-_2rem)] md:w-auto max-w-full md:max-w-[calc(100vw_-_(2rem_+_330px))] overflow-x-auto border-[3px] border-aqua-pink rounded-2xl">
        <TableCustom
          data={listItems}
          titleRow={titleRow}
          getStakedIds={getStakedIds}
        />
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

const mockData: any = [
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-9.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-9.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    land: "vinteno",
    time: "14:05:49",
    reward: "35.45",
  },
];

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
