"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useHydration } from "@/hooks/hydration";

export default function Home() {
	const isHydrated = useHydration();

	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="border hover:border-slate-900 rounded">
				{isHydrated ? <WalletMultiButton style={{}} /> : null}
			</div>
		</main>
	);
}
