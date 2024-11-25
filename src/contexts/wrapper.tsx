import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import React, { Fragment, ReactNode } from "react";

import AppWalletProvider from "./AppWalletProvider";

export default function Component({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<AppWalletProvider>
				<ThemeProvider
					enableSystem
					attribute="class"
				>
					{children}
				</ThemeProvider>
			</AppWalletProvider>
			<Toaster />
		</Fragment>
	);
}
