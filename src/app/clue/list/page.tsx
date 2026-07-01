import { Suspense } from "react";
import { getRandomList } from "../actions";

import "quill/dist/quill.snow.css";
import List from "./list";
import Loader from "@/components/loader";

export default async function Clues() {
	return (
		<div className="flex flex-col w-4/5 h-full">
			<Suspense fallback={<Loader size={64} pageCenter={true} />}>
				<CluesList />
			</Suspense>
		</div>
	);
}

async function CluesList() {
	const clues = await getRandomList();

	return (
		<div id="clueList" className="mt-3 pt-0 pr-2 overflow-y-auto h-full">
			<List clues={clues} />
		</div>
	);
}
