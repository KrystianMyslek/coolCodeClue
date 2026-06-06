"use client";

import { Alfa_Slab_One } from "next/font/google";
import { useEffect, useState } from "react";

const alfaSlabOne = Alfa_Slab_One({
	weight: "400",
});

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = (e: WheelEvent): void => {
			// Prevent header from appearing when scrolling the language list
			if (e.target instanceof Element) {
				const scrollPos = e.target.closest("#langList")?.scrollTop;
				if (scrollPos !== undefined && scrollPos > 0) {
					return;
				}
			}

			if (e.deltaY > 0) {
				if (!isScrolled && document.querySelector(".content")?.scrollTop == 0) {
					e.preventDefault();
				}

				setIsScrolled(true);
				document.querySelector("body")?.classList.add("scrolled");
			} else if (window.scrollY < 140 && document.querySelector(".content")?.scrollTop == 0) {
				setIsScrolled(false);
				document.querySelector("body")?.classList.remove("scrolled");
			}
		};

		window.addEventListener("mousewheel", handleScroll as EventListener, { passive: false });
		return () => window.removeEventListener("mousewheel", handleScroll as EventListener);
	}, [isScrolled]);

	return (
		<div className={`${alfaSlabOne.className} header`}>
			<h1>CoolCodeClue</h1>
			<div></div>
		</div>
	);
}
