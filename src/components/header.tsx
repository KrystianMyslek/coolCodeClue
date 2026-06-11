"use client";

import { Alfa_Slab_One } from "next/font/google";
import { useEffect, useState } from "react";

const alfaSlabOne = Alfa_Slab_One({
	weight: "400",
});

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	function checkContentScroll(e: WheelEvent) {
		// Prevent header from appearing when scrolling the content
		let r = true;
		const target = e.target;
		if (target instanceof Element) {
			["#langList", "#clueList", "#libraryList"].forEach((selector) => {
				const element = target.closest(selector);

				if (element && element?.scrollTop > 0) {
					r = false;
				}
			});
		}

		return r;
	}

	useEffect(() => {
		const handleScroll = (e: WheelEvent): void => {
			if (!checkContentScroll(e)) {
				return;
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
