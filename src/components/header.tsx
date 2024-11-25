import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

import { Button } from "./ui/button";
import { NextOptimizedImage } from "./next-image";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

const navigationLinks: {
	title: string;
	href: string;
}[] = [
	{ title: "Home", href: "/" },
	{ title: "Projects", href: "/" },
	{ title: "Dashboard", href: "/" },
	{ title: "Portfolio", href: "/" },
	{ title: "Staking", href: "/" },
	{ title: "Missions", href: "/" },
];

export default function Component() {
	return (
		<header className={`w-full flex items-center justify-center px-[2rem] py-4`}>
			<div
				className={`h-[2.5rem] flex items-center justify-between max-w-[91.75rem] w-full`}
			>
				<Link href="/">logo</Link>

				<NavigationMenu>
					<NavigationMenuList className={`gap-2`}>
						{navigationLinks.map(function (value, index) {
							return (
								<NavItem
									key={index}
									{...value}
								/>
							);
						})}
					</NavigationMenuList>
				</NavigationMenu>

				<ConnectWalletButton />
			</div>
		</header>
	);
}

function NavItem({ title, href }: { title: string; href: string }) {
	return (
		<NavigationMenuItem className={`rounded-full overflow-hidden`}>
			<Link
				href={href}
				legacyBehavior
				passHref
				className={`bg-transparent`}
			>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>
					{title}
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	);
}

function ConnectWalletButton() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { publicKey, disconnect, connected, wallets, select, connecting } = useWallet();

	return (
		<AlertDialog open={isModalOpen}>
			<AlertDialogTrigger asChild>
				<Button
					className={`rounded-full`}
					onClick={() => setIsModalOpen(true)}
					disabled={connecting}
				>
					{connected ? (
						<span>
							{publicKey?.toBase58().slice(0, 4)}...
							{publicKey?.toBase58().slice(-4)}
						</span>
					) : connecting ? (
						<Fragment>
							<span>Connecting...</span>
							<Loader2 className="animate-spin" />
						</Fragment>
					) : (
						<Fragment>
							<span>Login</span>
							<ArrowRight />
						</Fragment>
					)}
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{connected ? "SOONPAD" : "Login to SOONPAD"}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{connected
							? `Hello ${publicKey?.toBase58().slice(0, 4)}...${publicKey
									?.toBase58()
									.slice(-4)} !`
							: "Select your favorite wallet to login"}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter
					className={cn(`gap-5`, `sm:justify-center sm:flex-col`)}
				>
					<div className={`w-full flex items-center justify-center gap-2`}>
						{!publicKey
							? wallets
									.filter(
										(wallet) =>
											wallet.readyState === "Installed" ||
											"Loadable",
									)
									.map(function (value, index) {
										return (
											<Button
												key={index}
												onClick={() => {
													select(value.adapter.name);
													setIsModalOpen(false);
												}}
												variant={"secondary"}
											>
												<NextOptimizedImage
													alt={value.adapter.name}
													src={value.adapter.icon}
													className={`size-5`}
												/>
												<span>{value.adapter.name}</span>
											</Button>
										);
									})
							: null}
					</div>

					<Button
						variant={"destructive"}
						onClick={() => {
							setIsModalOpen(false);
							disconnect();
						}}
					>
						Logout
					</Button>
					<AlertDialogCancel onClick={() => setIsModalOpen(false)}>
						{connected ? "Close" : "Cancel"}
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
