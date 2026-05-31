import { Alfa_Slab_One } from "next/font/google";

const alfaSlabOne = Alfa_Slab_One({
	weight: "400",
});

export default function Header() {
	return (
		<div className={`${alfaSlabOne.className} header`}>
			<h1>CoolCodeClue</h1>
			<div></div>
		</div>
	);
}
