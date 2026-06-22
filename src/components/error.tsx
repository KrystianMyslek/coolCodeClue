export default function Error({ error }: { error: string }) {
	return <div className="rounded-lg bg-red-50 p-4 mb-4 text-sm text-red-600 font-medium">{error}</div>;
}
