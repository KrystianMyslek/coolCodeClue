"use client";

import "./globals.css";
import TopPanel from "./topPanel";

import { useEffect, useState } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = (e: WheelEvent): void => {
			if (e.deltaY > 0) {
				if (!isScrolled && document.querySelector(".content")?.scrollTop == 0) {
					e.preventDefault();
				}
				setIsScrolled(true);
			} else if (window.scrollY < 140 && document.querySelector(".content")?.scrollTop == 0) {
				setIsScrolled(false);
			}
		};

		window.addEventListener("mousewheel", handleScroll as EventListener, { passive: false });
		return () => window.removeEventListener("mousewheel", handleScroll as EventListener);
	}, [isScrolled]);

	return (
		<html lang="en" className={`h-full antialiased`}>
			<body className={`${isScrolled ? "scrolled" : ""}`}>
				<TopPanel />
				<div className="content">{children}</div>
			</body>
		</html>
	);
}
