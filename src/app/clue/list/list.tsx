"use client";

import Masonry from "react-masonry-css";
import { ClueTypeWithLang } from "@/repository/clue";
import { useSyncExternalStore } from "react";
import { Oval } from "react-loader-spinner";

function subscribeBreakpointCols(callback: () => void): () => void {
	window.addEventListener("resize", callback);
	return () => window.removeEventListener("resize", callback);
}

function getClientBreakpointCols(): number {
	return window.innerWidth > 1880 ? 3 : 2;
}

function getServerBreakpointCols(): number {
	return 0;
}

export default function List({ clues }: { clues: ClueTypeWithLang[] }) {
	const breakpointCols = useSyncExternalStore(
		subscribeBreakpointCols,
		getClientBreakpointCols,
		getServerBreakpointCols,
	);

	if (!breakpointCols) {
		return (
			<div className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center h-3/5">
				<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
			</div>
		);
	}

	return (
		<Masonry
			breakpointCols={breakpointCols}
			className="my-masonry-grid"
			columnClassName="my-masonry-grid_column"
		>
			{clues &&
				clues.map((clue) => (
					<div className="clue ql-snow border-2 mb-4 rounded-lg" key={clue.id}>
						<h4 className="title text-xl mb-2 py-2 px-4">
							<b>{clue.langName}</b> / {clue.title}
						</h4>
						<div className="ql-snow">
							<div
								className="ql-editor max-w-none"
								dangerouslySetInnerHTML={{ __html: clue.content }}
							/>
						</div>
					</div>
				))}
		</Masonry>
	);
}
