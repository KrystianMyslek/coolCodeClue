import { Suspense } from "react";
import { get } from "../../actions";

import EditForm from "./form";
import Loader from "@/components/loader";

export default async function Edit({ params }: { params: Promise<{ clueId: number }> }) {
	const { clueId } = await params;
	const clue = await get(clueId);

	return (
		<Suspense fallback={<Loader size={64} pageCenter={true} />}>
			{!clue && <h1 className="mt-8 w-full flex justify-center">CLUE NOT EXISTS</h1>}
			{clue && <EditForm clue={clue} />}
		</Suspense>
	);
}
