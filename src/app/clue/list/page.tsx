import { Suspense } from "react";
import { getRandomList } from "../actions";
import { Oval } from "react-loader-spinner";

import "quill/dist/quill.snow.css";

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
		<div id="clueList" className="mt-3 p-2 pt-0 overflow-y-auto">
			{clues &&
				clues.map((clue) => (
					<div className="clue ql-snow border-2 mb-4 rounded-lg" key={clue.id}>
						<h4 className="title text-xl mb-2 py-2 px-4">{clue.title}</h4>
						<div className="ql-snow">
							<div
								className="ql-editor max-w-none"
								dangerouslySetInnerHTML={{ __html: clue.content }}
							/>
						</div>
					</div>
				))}
		</div>
	);
}
