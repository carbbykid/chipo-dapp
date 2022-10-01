import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useProvider } from "wagmi";
import ABI_AUNI from "../../../contracts/tAquaUnicorn";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FaWallet } from "react-icons/fa";

const ConnectBar = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const provider = useProvider();

  return (
    <>
      <div className="flex justify-end gap-[40px] text-[20px]">
        {/* <div className="button min-w-[265px] text-right"> BUSD</div>
      <div className="button min-w-[265px] text-right"> AUNI</div> */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            return (
              <div
                {...(!mounted && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="flex gap-2 items-center"
                      >
                        <span className="hidden md:block">Connect Wallet</span>{" "}
                        <FaWallet />
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex gap-2 flex-col md:flex-row text-base md:text-xl">
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </>
  );
};

export default ConnectBar;
