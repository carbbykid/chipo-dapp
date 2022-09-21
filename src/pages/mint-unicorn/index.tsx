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
import ABI_AUNI from "../../../contracts/tAquaUnicorn";
import ABI_NFT from "../../../contracts/tAquaUnicornNFT";
import { BigNumber } from "ethers";
import Image from 'next/image';


const AUNIAddress ="0x1e5E4AdfE4cfcc68b8b54445280AFfe37c83607A";
const NFTAddress = "0xEBFD82e5f296e0ba6D0464cEA1c70e9DEe8DE808";



const Index: NextPage = () => {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { isConnected,address } = useAccount();
  const [amount, setAmount] = useState(1);

  const {
    data: price
  } = useContractRead({
    cacheOnBlock:true,
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'priceInAUNI',
  });

  const {
    data: allowance
  } = useContractRead({
    cacheOnBlock:true,
    addressOrName: AUNIAddress,
    contractInterface: ABI_AUNI.abi,
    functionName: 'allowance',
    args:[address,NFTAddress]
  });



  const {
    config:configNFT
  } = usePrepareContractWrite({
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: 'mint',
    args:[amount]
  });
  const { data:dataNFT, isLoading: isNFTLoading,isSuccess:isNFTSuccess, write  :mintNFT} = useContractWrite(configNFT);


  const {
    config
  } = usePrepareContractWrite({
    addressOrName: AUNIAddress,
    contractInterface: ABI_AUNI.abi,
    functionName: 'mint',
    args:[address,BigNumber.from("100000").mul(BigNumber.from("10").pow(18))]
  });
  const { data :dataToken, isLoading : isTokenLoading, isSuccess : isTokenSuccess, write  :mintToken} = useContractWrite(config);


  const {
    config : approvalConfig,
    // error: approvalErr
  } = usePrepareContractWrite({
    addressOrName: AUNIAddress,
    contractInterface: ABI_AUNI.abi,
    functionName: 'approve',
    args:[NFTAddress,BigNumber.from("0xfffffffffffffffffffffffffffffffffffffffff")]
  });
  // console.log("approvalErr",approvalErr)
  const { data :dataApproval, isLoading : isApprovalLoading, isSuccess : isApprovalSuccess, write  :approval} = useContractWrite(approvalConfig);

  


  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: dataNFT?.hash,
  });

  const total = useMemo(()=>{
    if(!amount || !price) return;
    return BigNumber.from(price?._hex).mul(amount);
  },[amount,price]);

 

  const isMinted = txSuccess;

  const {
    data: txDataToken,
    isSuccess: txSuccessToken,
    error: txErrorToken,
  } = useWaitForTransaction({
    hash: dataToken?.hash,
  });

  const isTokenMinted = txSuccessToken;

  const {
   
    isSuccess: txSuccessArroval,
    // error: txErrorToken,
  } = useWaitForTransaction({
    hash: dataApproval?.hash,
  });

  const approved = useMemo(()=>{
    if(txSuccessArroval) return true;
    if(!total || !allowance) return false;
    return BigNumber.from(allowance._hex).gte(total);
  },[total, allowance,txSuccessArroval]);

  // console.log("BigNumber.from(allowance._hex)",BigNumber.from(allowance?._hex));
  console.log("total",total);
  console.log("allowance",allowance);
  return (
    <>

      <TitleBar title="Mint Unicorn" />
      <div className="relative flex -mt-[140px]">
        <div className="absolute -left-[40px] w-[936px] h-[929px]">
          <div className="relative w-full h-full">
            <img
              className="w-[879px] left-1/2 -translate-x-1/2 absolute z-[5]"
              src="/images/mint-unicorn/mint-domdom.png"
              alt="aqua-dapp"
              // layout='fill'
            />
            <img
              className="w-[936px] bottom-[238px] absolute z-[4]"
              src="/images/mint-unicorn/mint-before-cloud.png"
              alt="aqua-dapp"
              // layout='fill'
            />
            <img
              className="w-[307px] absolute left-1/2 -translate-x-1/2 bottom-[213px] z-[3]"
              src="/images/mint-unicorn/mint-egg.png"
              alt="aqua-dapp"
              // layout='fill'
            />
            <img
              className="w-[774px] left-1/2 -translate-x-1/2 bottom-[16px] absolute z-[2]"
              src="/images/mint-unicorn/mint-after-cloud.png"
              alt="aqua-dapp"
              // layout='fill'
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
          <NumberInputSpinner min={1} max={10} value={amount} setValue={setAmount} />
          <p className="text-[25px] mb-[35px] text-center">
            MAXIMUM QUANTITY 10
          </p>

           {mounted && isConnected && (
            <>
                <button
                  disabled={!mintToken || isTokenLoading || isTokenSuccess}
                  data-mint-loading={isTokenLoading}
                  data-mint-started={isTokenSuccess}
                  onClick={() => mintToken?.()} 
                  className="button text-[48px] border-[2px] rounded-[15px] py-[10px] px-[20px] mx-auto my-0 block text-center"
                >
                 {isTokenLoading && 'Waiting for approval'}
                 {isTokenSuccess && 'Get Token...'}
                 {isTokenMinted && 'Success'}
                 {!isTokenLoading && !isTokenSuccess && 'Get Test Token'}
              </button>                
              {approved && (
                <button
                  disabled={!mintNFT || isNFTLoading || isNFTSuccess}
                  data-mint-loading={isNFTLoading}
                  data-mint-started={isNFTSuccess}
                  onClick={() => mintNFT?.()} 
                  className="button text-[48px] border-[2px] rounded-[15px] py-[10px] px-[20px] mx-auto my-0 block text-center"
                >
                 {isNFTLoading && 'Waiting for approval'}
                 {isNFTSuccess && 'Minting...'}
                 {isMinted && 'Success'}
                 {!isNFTLoading && !isNFTSuccess && 'Mint Unicorn'}
              </button>
              )}

              {!approved && (
                <button
                  disabled={!approval || isApprovalLoading || isApprovalSuccess}
                  data-mint-loading={isApprovalLoading}
                  data-mint-started={isApprovalSuccess}
                  onClick={() => approval?.()} 
                  className="button text-[48px] border-[2px] rounded-[15px] py-[10px] px-[20px] mx-auto my-0 block text-center"
                >
                 {isApprovalLoading && 'Waiting for approval'}
                 {isApprovalSuccess && 'Aproval...'}
                 {!isApprovalLoading && !isApprovalSuccess && 'Appproval'}
              </button>
              )}
              
            </>
          )}

      

        </div>
      </div>
    </>
  );
};

export default Index;
