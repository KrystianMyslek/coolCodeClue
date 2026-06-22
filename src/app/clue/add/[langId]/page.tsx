import AddForm from "./form";

export default async function Add({ params }: { params: Promise<{ langId: number }> }) {
	const { langId } = await params;

	return <AddForm langId={langId} />;
}
