import { Suspense } from "react";
import { getRandomList } from "../actions";
import { Oval } from "react-loader-spinner";

import "quill/dist/quill.snow.css";
import List from "./list";

export default async function Clues() {
	return (
		<div className="flex flex-col w-4/5 h-full">
			<Suspense
				fallback={
					<div className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center h-3/5">
						<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
					</div>
				}
			>
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
