import { Suspense } from "react";
import { get } from "../../actions";
import { Oval } from "react-loader-spinner";

import EditForm from "./form";

export default async function Edit({ params }: { params: Promise<{ clueId: number }> }) {
	const { clueId } = await params;
	const clue = await get(clueId);

	return (
		<Suspense
			fallback={
				<div className="disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center justify-center h-3/5">
					<Oval visible={true} color="#444" secondaryColor="#aaa" height="64" width="64" />
				</div>
			}
		>
			{!clue && <h1 className="mt-8 w-full flex justify-center">CLUE NOT EXISTS</h1>}
			{clue && <EditForm clue={clue} />}
		</Suspense>
	);
}
