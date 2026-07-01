import { Suspense } from "react";
import { get } from "../../actions";

import EditForm from "./form";
import Loader from "@/components/loader";

export default async function Edit({ params }: { params: Promise<{ libraryId: number }> }) {
	const { libraryId } = await params;
	const library = await get(libraryId);

	return (
		<Suspense fallback={<Loader size={64} pageCenter={true} />}>
			{!library && <h1 className="mt-8 w-full flex justify-center">LIBRARY NOT EXISTS</h1>}
			{library && <EditForm library={library} />}
		</Suspense>
	);
}
