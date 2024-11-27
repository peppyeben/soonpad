"use client";

import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { CreateTokenLaunchPage } from "./create-token-launch-page";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export default function CreateTokenLaunchForm() {
    const CUSTOM_RPC_ENDPOINT = "https://rpc.devnet.soo.network/rpc";
    const endpoint = useMemo(() => CUSTOM_RPC_ENDPOINT, []);
    const wallets = useMemo(() => [], []);

    return (
        // <ConnectionProvider endpoint={endpoint}>
        //   <WalletProvider wallets={wallets} autoConnect>
        //     <WalletModalProvider>
        <CreateTokenLaunchPage />
        //     {/* </WalletModalProvider>
        //   </WalletProvider>
        // </ConnectionProvider> */}
    );
}
