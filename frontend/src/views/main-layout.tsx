"use client";

import { useTheme } from "next-themes";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ReactNode, useEffect } from "react";

export default function Component({ children }: { children: ReactNode }) {
	const { theme, setTheme } = useTheme();

	useEffect(
		function () {
			if (theme) setTheme("dark");
		},
		[setTheme, theme],
	);

	return (
		<section className={`min-h-screen relative`}>
			<Header />
			<main className={`max-w-[80rem] mx-auto pb-[45.5rem] pt-[2.25rem] px-[2rem]`}>
				{children}
			</main>
			<Footer />
		</section>
	);
}
