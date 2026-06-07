import Clues from "./clue/list/page";
import Langs from "./lang/list/page";

export default function Home() {
	return (
		<div className="content">
			<div className="flex w-full h-full">
				<Langs />
				<Clues />
			</div>
		</div>
	);
}
