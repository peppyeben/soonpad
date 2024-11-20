"use client";

import { useHydration } from "@/hooks/hydration";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
	const isHydrated = useHydration();

	return (
		<main className="flex items-center justify-center">
			<div className="border hover:border-slate-900 rounded">
				{isHydrated ? <WalletMultiButton style={{}} /> : null}
			</div>
			<h1 className="text-3xl underline">hello world</h1>
		</main>
	);
}
