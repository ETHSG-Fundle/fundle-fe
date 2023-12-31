"use client";

import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

// const ethereumRopsten = {
//   id: "0x3",
//   token: "rETH",
//   label: "Ethereum Ropsten",
//   rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
// };

const ethereumGoerli = {
  id: "0x5",
  token: "ETH",
  label: "Goerli",
  rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
};

const mantle = {
  id: "0x1389",
  token: "MNT",
  label: "Mantle Testnet",
  rpcUrl: "https://rpc.testnet.mantle.xyz/",
};

const linea = {
  id: "0xe704",
  token: "ETH",
  label: "Linea",
  rpcUrl: `https://linea-goerli.infura.io/v3/${INFURA_KEY}`,
};

const chains = [ethereumGoerli, mantle, linea];
const wallets = [injectedModule()];

const web3Onboard = init({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: "<svg>App Icon</svg>",
    description: "A demo of Web3-Onboard.",
  },
  connect: {
    autoConnectLastWallet: true,
  },
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
};
