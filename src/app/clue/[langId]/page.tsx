import { Suspense } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/app/auth/actions";
import { get } from "../actions";

import "quill/dist/quill.snow.css";
import { Oval } from "react-loader-spinner";

export default async function Clues({ params }: { params: Promise<{ langId: string }> }) {
	const isAuth = await isAuthenticated();
	const { langId } = await params;

	return (
		<div className="flex flex-col w-4/5 h-full">
			<div className="flex w-full mt-3">
				<div className="bg-linear-to-b from-(--title-secondary-bg-color) to-white text-white w-1/2 px-3 rounded-t-2xl h-16 mr-2 flex justify-between items-center">
					<span className="text-2xl">Clues</span>
					{isAuth && (
						<Link
							className="primary-button w-32 p-1 px-4 text-xl font-bold"
							href={`/clue/add/${langId}`}
						>
							Add Clue
						</Link>
					)}
				</div>

				<Link
					className="bg-linear-to-b from-(--title-text-color) to-white w-1/2 rounded-t-2xl h-16 px-3 mr-2 text-2xl flex justify-between items-center"
					href={`/library/${langId}`}
				>
					Libraries
				</Link>
			</div>

			<Suspense
				fallback={
					<div className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center h-3/5">
						<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
					</div>
				}
			>
				<CluesList langId={langId} />
			</Suspense>
		</div>
	);
}

async function CluesList({ langId }: { langId: string }) {
	const clues = await get(langId);

	return (
		<div id="clueList" className="p-2 overflow-y-auto">
			{clues &&
				clues.map((clue) => (
					<div className="clue border-2 mb-4 rounded-lg" key={clue.id}>
						<h4 className="title text-xl mb-2 py-2 px-4 ">{clue.title}</h4>
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
