import AddForm from "./form";

export default async function Add({ params }: { params: Promise<{ langId: string }> }) {
	const { langId } = await params;

	return <AddForm langId={langId} />;
}
