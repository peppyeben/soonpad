"use client";

import React, { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    SolflareWalletAdapter,
    NightlyWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";

const CUSTOM_RPC_ENDPOINT = "https://rpc.devnet.soo.network/rpc";

export default function AppWalletProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // const network = WalletAdapterNetwork.Devnet;
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const endpoint = useMemo(() => CUSTOM_RPC_ENDPOINT, []);

    const wallets = useMemo(
        () => [
            // manually add any legacy wallet adapters here
            new NightlyWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
