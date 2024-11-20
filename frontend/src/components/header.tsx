import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

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
			<div className={`h-[2.5rem] flex items-center justify-between max-w-[91.75rem] w-full`}>
				<Link href="/">logo</Link>

				<NavigationMenu>
					<NavigationMenuList className={`gap-3`}>
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

				<Button className={`rounded-full`}>
					<span>Login</span>
					<ArrowRight />
				</Button>
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
