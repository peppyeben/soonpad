import React, { Fragment, ReactNode } from "react";

import AppWalletProvider from "./AppWalletProvider";

export default function Component({ children }: { children: ReactNode }) {
	return (
		<Fragment>
			<AppWalletProvider>{children}</AppWalletProvider>
		</Fragment>
	);
}
