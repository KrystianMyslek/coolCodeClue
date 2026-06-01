import type { Metadata } from "next";

import "./globals.css";
import TopPanel from "@/components/topPanel";

export const metadata: Metadata = {
	title: "Cool Code Clue",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`h-full antialiased`}>
			<body>
				<TopPanel />
				<div className="content">{children}</div>
			</body>
		</html>
	);
}
