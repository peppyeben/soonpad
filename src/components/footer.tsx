import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { ChangeEvent, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FaDiscord,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6";

import { Button } from "./ui/button";

interface ILink {
	href: string;
	title: string;
}

interface IFooterLink {
	title: string;
	links: ILink[];
}

interface ISocialLink {
	href: string;
	icon: IconType;
}

const FooterLinks: IFooterLink[] = [
	{
		title: "Company",
		links: [
			{
				title: "About us",
				href: "",
			},
			{
				title: "Blog",
				href: "",
			},
			{
				title: "Council",
				href: "",
			},
			{
				title: "Press kit",
				href: "",
			},
			{
				title: "POLS Dashboard",
				href: "",
			},
		],
	},
	{
		title: "Help",
		links: [
			{
				title: "Support",
				href: "",
			},
			{
				title: "Terms & Conditions",
				href: "",
			},
			{
				title: "Privacy Policy",
				href: "",
			},
		],
	},
	{
		title: "Developers",
		links: [
			{
				title: "Documentation",
				href: "",
			},
			{
				title: "SOONPAD.js",
				href: "",
			},
		],
	},
	{
		title: "Information",
		links: [
			{
				title: "Apply for IDO",
				href: "",
			},
		],
	},
	{
		title: "Products",
		links: [
			{
				title: "Gaming",
				href: "",
			},
			{
				title: "Poolside Podcast",
				href: "",
			},
			{
				title: "Poolside Accelerator",
				href: "",
			},
			{
				title: "Poolside Hub",
				href: "",
			},
		],
	},
	{
		title: "Resources",
		links: [
			{
				title: "Projects",
				href: "",
			},
			{
				title: "Dashboard",
				href: "",
			},
			{
				title: "Portfolio",
				href: "",
			},
			{
				title: "Staking",
				href: "",
			},
			{
				title: "Missions",
				href: "",
			},
		],
	},
];

const FooterSocials: ISocialLink[] = [
	{
		href: "",
		icon: FaXTwitter,
	},
	{
		href: "",
		icon: FaTelegramPlane,
	},
	{
		href: "",
		icon: FaDiscord,
	},
	{
		href: "",
		icon: FaInstagram,
	},
	{
		href: "",
		icon: FaYoutube,
	},
	{
		href: "",
		icon: FaLinkedin,
	},
	{
		href: "",
		icon: FaGithub,
	},
];

export default function Component() {
	return (
		<footer
			className={`absolute bottom-0 max-h-[45.5rem] pt-[4rem] pb-[2.5rem] w-full flex justify-center`}
			style={{
				background:
					"linear-gradient(rgb(23, 23, 23) 0%, rgba(39, 39, 42, 0) 100%)",
			}}
		>
			<div className={`px-[2rem] max-w-[80rem] w-full space-y-[5rem]`}>
				<RenderNewsletter />
				<RenderFooterLinks />
				<RenderSocialsAndSettings />
			</div>
		</footer>
	);
}

function RenderNewsletter() {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	return (
		<Card
			className={`border-green--300/50 bg-green--400 flex justify-between items-center py-[3.5rem] px-[2.5rem] rounded-2xl`}
		>
			<CardHeader className={`p-0`}>
				<CardTitle className={`text-green--200/50 text-base`}>
					Never want to miss a sale?
				</CardTitle>
				<CardDescription className={`text-2xl`}>
					Sign up for our newsletter and get <br /> the latest news and updates.
				</CardDescription>
			</CardHeader>
			<CardFooter
				className={`w-[28.25rem] h-[4.25rem] flex items-center justify-center p-0 group/newsletter`}
			>
				<form
					className={cn(
						`relative flex items-center justify-between rounded-md px-[.75rem] size-full border-green--300/50 border group-hover/newsletter:border-green--200 transition-all bg-black/25`,
						isFocused ? `ring-4 ring-green--100/15 border-green--200` : ``,
					)}
				>
					<label
						htmlFor="email"
						className={cn(
							`absolute transition-all pl-2 text-muted-foreground`,
							isFocused || value ? `text-xs -translate-y-1/2` : ``,
						)}
					>
						Email Address<span className={`text-red-400`}>*</span>
					</label>
					<input
						type="email"
						id="email"
						className={`bg-transparent peer w-full pt-6 pl-2 pr-4 outline-none border-none`}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setValue(event.target.value)
						}
						required
					/>
					<Button
						className={`w-[6.25rem] h-[2.5rem] rounded-full bg-green--200 hover:bg-green--200/75`}
					>
						<span>Subscribe</span>
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
}

function RenderFooterLinks() {
	return (
		<section className={`flex justify-between`}>
			<div className={`grid grid-cols-4`}>
				<FooterLinkSection
					title={FooterLinks[0].title}
					links={FooterLinks[0].links}
				/>

				<section className={`space-y-6`}>
					<FooterLinkSection
						title={FooterLinks[1].title}
						links={FooterLinks[1].links}
					/>
					<FooterLinkSection
						title={FooterLinks[2].title}
						links={FooterLinks[2].links}
					/>
				</section>

				<section className={`space-y-6`}>
					<FooterLinkSection
						title={FooterLinks[3].title}
						links={FooterLinks[3].links}
					/>
					<FooterLinkSection
						title={FooterLinks[4].title}
						links={FooterLinks[4].links}
					/>
				</section>

				<FooterLinkSection
					title={FooterLinks[5].title}
					links={FooterLinks[5].links}
				/>
			</div>

			<div className={`flex flex-col items-end gap-4`}>
				<h3 className={`text-foreground text-2xl`}>SOONPAD</h3>
				<span className={`text-muted-foreground text-lg`}>
					Feels good to be early
				</span>
			</div>
		</section>
	);
}

function FooterLinkSection({ title, links }: IFooterLink) {
	return (
		<nav className={`flex flex-col gap-y-1 w-[14rem]`}>
			<h4 className={`text-foreground text-base`}>{title}</h4>
			{links.map(function (value: ILink, index: number) {
				return (
					<Link
						href={value.href}
						key={index}
						className={`text-muted-foreground/70 text-sm hover:text-foreground/75 transition-colors`}
					>
						{value.title}
					</Link>
				);
			})}
		</nav>
	);
}

function RenderSocialsAndSettings() {
	return (
		<section>
			<div className={`gap-4 flex`}>
				{FooterSocials.map(function (value, index) {
					return (
						<Link
							key={index}
							href={value.href}
						>
							<value.icon />
						</Link>
					);
				})}
			</div>
		</section>
	);
}
