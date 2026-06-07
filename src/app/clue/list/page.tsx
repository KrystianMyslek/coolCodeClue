import { Suspense } from "react";
import { getRandomList } from "../actions";

import "quill/dist/quill.snow.css";

export default async function Clues() {
	return (
		<div id="clueList" className="flex flex-col w-3/4 h-full pr-4 overflow-y-auto">
			<Suspense fallback={<h2 className="text-xl">Loading...</h2>}>
				<CluesList />
			</Suspense>
		</div>
	);
}

async function CluesList() {
	const clues = await getRandomList();

	return (
		<div className="pt-4">
			{clues &&
				clues.map((clue) => (
					<div className="clue ql-snow border-2 mb-4 rounded-lg" key={clue.id}>
						<h4 className="title text-2xl mb-2 py-2 px-4 ">{clue.title}</h4>
						<div
							className="clue_content ql-editor max-w-none"
							dangerouslySetInnerHTML={{ __html: clue.content }}
						/>
					</div>
				))}
		</div>
	);
}
