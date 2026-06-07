import { Suspense } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/app/auth/actions";
import { get } from "../actions";

import "quill/dist/quill.snow.css";

export default async function Clues({ params }: { params: Promise<{ langId: string }> }) {
	const isAuth = await isAuthenticated();
	const { langId } = await params;

	return (
		<div id="clueList" className="flex flex-col w-3/4 h-full pr-4 overflow-y-auto">
			{isAuth && (
				<Link
					className="primary-button w-60 mt-3 mx-2 p-4 text-2xl font-bold"
					href={{
						pathname: "/clue/add",
						query: { langId },
					}}
				>
					Add Clue
				</Link>
			)}

			<Suspense fallback={<h2 className="text-xl">Loading...</h2>}>
				<CluesList langId={langId} />
			</Suspense>
		</div>
	);
}

async function CluesList({ langId }: { langId: string }) {
	const clues = await get(langId);

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
