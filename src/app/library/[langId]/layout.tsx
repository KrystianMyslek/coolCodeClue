import Langs from "@/app/lang/list/page";

export default async function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ langId: number }>;
}>) {
	const { langId } = await params;

	return (
		<div className="content">
			<div className="flex w-full h-full">
				<Langs langId={langId} />
				{children}
			</div>
		</div>
	);
}
