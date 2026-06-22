import { Suspense } from "react";
import { get } from "../../actions";
import { Oval } from "react-loader-spinner";

import EditForm from "./form";

export default async function Edit({ params }: { params: Promise<{ libraryId: number }> }) {
	const { libraryId } = await params;
	const library = await get(libraryId);

	return (
		<Suspense
			fallback={
				<div className="disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center justify-center h-3/5">
					<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
				</div>
			}
		>
			{!library && <h1 className="mt-8 w-full flex justify-center">LIBRARY NOT EXISTS</h1>}
			{library && <EditForm library={library} />}
		</Suspense>
	);
}
