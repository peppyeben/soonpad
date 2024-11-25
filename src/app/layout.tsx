import type { Metadata } from "next";

import "./globals.css";

import BaseLayout from "@/views/main-layout";
import ContextsWrapper from "@/contexts/wrapper";

export const metadata: Metadata = {
	title: "SOONPAD",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body>
				<link
					href="https://fonts.cdnfonts.com/css/arial-mt"
					rel="stylesheet"
				/>
				<ContextsWrapper>
					<BaseLayout>{children}</BaseLayout>
				</ContextsWrapper>
			</body>
		</html>
	);
}
