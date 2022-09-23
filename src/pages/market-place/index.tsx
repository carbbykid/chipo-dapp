import Pagination from "components/common/Pagination";
import TableCustom from "components/common/TableCustom";
import TitleBar from "components/layout/TitleBar";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

const recordsPerPage = 4;

const Index: NextPage = () => {
  const [listItems, setListItems] = useState<any>([]);

  const router = useRouter();
  const page = useMemo(
    () => Number(router.query.page) || 1,
    [router.query.page],
  );
  const totalPages = Math.ceil(mockData.length / recordsPerPage);

  const loadListItem = useCallback(() => {
    setListItems(generateDataOnPage(page, recordsPerPage));
  }, [page]);

  const generateDataOnPage = (page: number, size: number) => {
    const offset = (page - 1) * size;

    if (offset + size > mockData.length) {
      return mockData.slice(offset, mockData.length);
    } else {
      return mockData.slice(offset, offset + size);
    }
  };

  useEffect(() => {
    loadListItem();
  }, [loadListItem]);

  return (
    <>
      <TitleBar
        title="MARKET PLACE"
        element={
          <div className="flex mb-[40px] text-[25px]">
            <button className="button ml-[51px] py-[3px] px-[23px]">
              Filter price
            </button>
            <button className="button ml-[51px] py-[3px] px-[23px]">
              Filter rank
            </button>
          </div>
        }
      />
      <div className="mb-[30px]">
        <TableCustom data={listItems} titleRow={titleRow}/>
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
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-9.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-9.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-1.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-2.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-3.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-4.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-5.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-6.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-7.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
  {
    pet: "/images/my-pets/my-pet-8.png",
    id: "123456",
    rank: "supreme",
    seller: "0x1Fa80B84B...114a9516C450",
    oldPrice: "500.00",
    newPrice: "449.49",
  },
];

const titleRow = [
  { title: "PET", field: "pet" },
  { title: "ID", field: "id" },
  { title: "RANK", field: "rank" },
  { title: "SELLER", field: "seller" },
  {
    title: "PRICE (BUSD)",
    field: (id: string, data?: any) => (
      <div>
        <div>{data.oldPrice}</div>
        <div className="text-aqua-pink">{data.newPrice}</div>
      </div>
    ),
  },
  {
    title: "FUNCTION",
    field: (id?: string, data?: any) => (
      <div className="flex justify-center gap-[40px]">
        <button className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
          BARGAIN
        </button>
        <button className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
          BUY
        </button>
      </div>
    ),
  },
];
