import { Suspense } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/app/auth/actions";
import { getList } from "../actions";

import "quill/dist/quill.snow.css";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default async function Libraries({ params }: { params: Promise<{ langId: string }> }) {
	const isAuth = await isAuthenticated();
	const { langId } = await params;

	return (
		<div className="flex flex-col w-4/5 h-full">
			<div className="flex w-full mt-3">
				<Link
					className="bg-linear-to-b from-(--title-text-color) to-white w-1/2 rounded-t-2xl h-16 px-3 mr-2 text-2xl flex justify-between items-center"
					href={`/clue/${langId}`}
				>
					Clues
				</Link>

				<div className="bg-linear-to-b from-(--title-secondary-bg-color) to-white text-white px-3 w-1/2 rounded-t-2xl h-16 flex justify-between items-center">
					<span className="text-2xl">Libraries</span>
					{isAuth && (
						<Link href={`/library/add/${langId}`}>
							<FontAwesomeIcon
								className="cursor-pointer text-white hover:text-gray-300"
								icon={faPlus}
								width={24}
							/>
						</Link>
					)}
				</div>
			</div>

			<Suspense
				fallback={
					<div className="disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center justify-center h-3/5">
						<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
					</div>
				}
			>
				<LibrariesList langId={langId} />
			</Suspense>
		</div>
	);
}

async function LibrariesList({ langId }: { langId: string }) {
	const Libraries = await getList(langId);

	return (
		<div id="libraryList" className="p-2 overflow-y-auto">
			{Libraries &&
				Libraries.map((lib) => (
					<div className="library border-2 mb-4 rounded-lg" key={lib.id}>
						<h4 className="flex justify-between align-middle title text-xl mb-2 py-2 px-4">
							<a target="_blank" href={lib.url}>
								{lib.name}
							</a>
							<Link href={{ pathname: `/library/edit/${lib.id}` }}>
								<FontAwesomeIcon
									className="cursor-pointer text-white hover:text-gray-300"
									icon={faPenToSquare}
									width={24}
								/>
							</Link>
						</h4>
						<div className="ql-snow">
							<div
								className="ql-snow ql-editor max-w-none"
								dangerouslySetInnerHTML={{ __html: lib.description }}
							/>
						</div>
					</div>
				))}
		</div>
	);
}
