import ABI_AUNI from "../../../../contracts/tAquaUnicorn";
import Staking_NFT from "../../../../contracts/AquaUnicornStaking";
import ABI_NFT from "../../../../contracts/tAquaUnicornNFT";
import { BigNumber } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { Decimal } from "decimal.js";
import contractAddress from "../../../constants/contractAddress";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
const AUNIAddress = contractAddress.AUNIAddress;
const NFTAddress = contractAddress.NFTAddress;
const StakingAddress = contractAddress.StakingAddress;

const PetWorking = ({
  row,
  titleRow,
  idx,
}: {
  titleRow: any;
  row: any;
  idx: any;
}): JSX.Element => {
  const { isConnected, address } = useAccount();
  // console.log("handleReload",handleReload);
  const { config: unstakeConfig, error } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: "unstake",
    args: [address, row.id],
  });
  const {
    data: dataUnstake,
    isLoading: isUnstakeLoading,
    isSuccess: isUnstakeSuccess,
    write: unstake,
  } = useContractWrite(unstakeConfig);

  const { isSuccess: txSuccessUnStake } = useWaitForTransaction({
    hash: dataUnstake?.hash,
  });

  const { data: rewards } = useContractRead({
    watch: true,
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: "getRewardedToken",
    args: [address, row.id],
  });

  //   console.log("rewards",rewards);

  const { data: rare } = useContractRead({
    addressOrName: NFTAddress,
    contractInterface: ABI_NFT.abi,
    functionName: "getRare",
    args: [row.id],
  });

  const { config: claimConfig } = usePrepareContractWrite({
    addressOrName: StakingAddress,
    contractInterface: Staking_NFT.abi,
    functionName: "claimReward",
    args: [address, row.id],
  });
  const {
    data: dataClaim,
    isLoading: isClaimLoading,
    isSuccess: isClaimSuccess,
    write: claim,
  } = useContractWrite(claimConfig);

  const { isSuccess: txSuccessClaim } = useWaitForTransaction({
    hash: dataClaim?.hash,
  });
  const claimSuccess = txSuccessClaim;

  const unstakeSuccess = txSuccessUnStake;

  return (
    <>
      {!unstakeSuccess && (
        <>
          <tr key={idx} className="">
            {titleRow.map((col: any, idx: number) => (
              <td
                className={`pt-[32px] min-w-[110px] whitespace-pre-line`}
                key={idx}
              >
                {idx === 0 ? (
                  <div className="collections_preview__listItemImageBox">
                    {/* {row?.images?.map((img: any, index: number) => (
                      <img
                        key={`image_${index}`}
                        className="w-[131px] mx-auto my-0 border-[3px] rounded-[15px] border-aqua-pink"
                        src={row.pet}
                        alt="aqua-nft"
                      />
                    ))} */}

                    <img
                      className="w-[131px] mx-auto my-0 border-[3px] rounded-[15px] border-aqua-pink"
                      src={row.pet}
                      alt="aqua-nft"
                    />
                  </div>
                ) : typeof col.field !== "string" ? (
                  col.field(idx, row)
                ) : (
                  row[col.field]
                )}
                {/* {col.field === "reward" &&
                  new Decimal(BigNumber.from(rewards?._hex || 0).toString())
                    .div(Math.pow(10, 18))
                    .toString()
                    .substring(0, 5)}
                {col.field === "id" && row[col.field]}
                {col.field === "rank" && Rare[(rare as unknown as number) || 0]}
                {col.field === "land" && Land[(rare as unknown as number) || 0]}
                {col.field === "functions" && (
                  <>
                    <div className="flex justify-center gap-[40px]">
                      <button
                        disabled={!claim || isClaimLoading || isClaimSuccess}
                        data-mint-loading={isClaimLoading}
                        data-mint-started={isClaimSuccess}
                        onClick={() => {
                          claim?.();
                        }}
                        className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]"
                      >
                        {isClaimLoading && "Waiting for approval"}
                        {isClaimSuccess && !claimSuccess && "Claiming..."}
                        {claimSuccess && "Claimed"}
                        {!isClaimLoading && !isClaimSuccess && "Claim"}
                      </button>
                      <button
                        disabled={
                          !unstake || isUnstakeLoading || isUnstakeSuccess
                        }
                        data-mint-loading={isUnstakeLoading}
                        data-mint-started={isUnstakeSuccess}
                        onClick={() => {
                          unstake?.();
                        }}
                        className="button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[8px]"
                      >
                        {isUnstakeLoading && "Waiting for approval"}
                        {isUnstakeSuccess && "Unstaking..."}
                        {UnstakeSuccess && 'Claimed'}
                        {!isUnstakeLoading && !isUnstakeSuccess && "Unstake"}
                      </button>
                    </div>
                  </>
                )} */}
              </td>
            ))}
          </tr>
        </>
      )}
    </>
  );
};
export default PetWorking;

enum Rare {
  COMMON,
  RARE,
  SUPERRARE,
  EPIC,
  SUPEREPIC,
  LEGENDARY,
  LEGEND,
  SUPREME,
}

enum Land {
  Pellucidar,
  NEVER,
  ShangriLa,
  MiddleEarth,
  Narnia,
  DREAM,
}
