import type { AppProps } from "next/app";
import "assets/styles/global.scss";

import { chain, Chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import Sidebar from "components/layout/Sidebar";
import ConnectBar from "components/layout/ConnectBar";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import Head from "next/head";
// Get Your projectId at https://cloud.walletconnect.com
const WC_PROJECT_ID = "a5894fa021b22d287d96ddc0a910f1a6";

// Configure chains and providers (rpc's)
const bscchain: Chain = {
  id: 97,
  name: "BSC testnet",
  network: "Smart Chain - Testnet",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  testnet: true,
  blockExplorers: {
    default: { name: "bscscan", url: "https://testnet.bscscan.com/" },
  },
};

const { chains, provider } = configureChains(
  [bscchain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bscchain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ],
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Aqua Unicorn</title>
        <meta name="description" content="Aqua Unicorn" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className="flex z-10 relative min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1 p-4 border-1 border-dashed">
              <ConnectBar />
              <Component {...pageProps} />
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
