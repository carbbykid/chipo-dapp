import ABI_AUNI from "../../../../contracts/tAquaUnicorn";
import Staking_NFT from "../../../../contracts/AquaUnicornStaking";
import ABI_NFT from "../../../../contracts/tAquaUnicornNFT";
import { BigNumber } from "ethers";
import Image from 'next/image';
import { useRouter } from 'next/router';

import contractAddress from "../../../constants/contractAddress";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
const AUNIAddress =contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress= contractAddress.StakingAddress;


const Functions = ({id, data, handleReload}: {id:string | undefined, data:any,handleReload:any} ): JSX.Element => {
    const { isConnected,address } = useAccount();
    // console.log("handleReload",handleReload);
    const router= useRouter();
    const {
        config : unstakeConfig,
        error
    } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: 'unstake',
    args:[address,id],
    });
    const { data :dataUnstake, isLoading : isUnstakeLoading, isSuccess : isUnstakeSuccess, write :unstake} = useContractWrite(unstakeConfig);

    const {
        isSuccess: txSuccessUnStake,
      } = useWaitForTransaction({
        hash: dataUnstake?.hash,
    });



    const sleep = (ms:any) => new Promise(r => setTimeout(r, ms));


    
    

    const {
        config : claimConfig
    } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: 'claimReward',
    args:[address,id]
    });
    const { data :dataClaim, isLoading : isClaimLoading, isSuccess : isClaimSuccess, write  :claim} = useContractWrite(claimConfig);


    const {
   
        isSuccess: txSuccessClaim,
      } = useWaitForTransaction({
        hash: dataClaim?.hash,
      });
    
    const claimSuccess =  txSuccessClaim ;

    const unstakeSuccess = txSuccessUnStake;
    if(unstakeSuccess) {
        
        handleReload();
    }
    // console.log("Reloaded");



    return (
    <div className="flex justify-center gap-[40px]">
      <button 
        disabled={!claim || isClaimLoading || isClaimSuccess}
        data-mint-loading={isClaimLoading}
        data-mint-started={isClaimSuccess}
        onClick={() => {
            claim?.();
        }} 
        className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
        {isClaimLoading && 'Waiting for approval'}
        {isClaimSuccess && 'Claiming...'}
        {claimSuccess && 'Claimed'}
        {!isClaimLoading && !isClaimSuccess && 'Claim'}
      </button>
      <button 
        disabled={!unstake || isUnstakeLoading || isUnstakeSuccess}
        data-mint-loading={isUnstakeLoading}
        data-mint-started={isUnstakeSuccess}
        onClick={() => {
            unstake?.();
        }} 
        className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]">
        {isUnstakeLoading && 'Waiting for approval'}
        {isUnstakeSuccess && 'Unstaking...'}
        {/* {UnstakeSuccess && 'Claimed'} */}
        {!isUnstakeLoading && !isUnstakeSuccess && 'Unstake'}
      </button>
    </div>
  );
};
export default Functions;

