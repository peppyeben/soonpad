import { ReactNode } from "react";

export default function Component({ children }: { children: ReactNode }) {
	return (
		<section className={`border-4 border-red-600`}>
			<header>header</header>
			{children}
			<footer>footer</footer>
		</section>
	);
}
