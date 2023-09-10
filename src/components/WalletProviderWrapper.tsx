"use client";

import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

const INFURA_KEY = "";

const ethereumRopsten = {
  id: "0x3",
  token: "rETH",
  label: "Ethereum Ropsten",
  rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

const chains = [ethereumRopsten];
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
