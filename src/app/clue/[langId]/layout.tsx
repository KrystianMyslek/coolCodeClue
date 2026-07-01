import Langs from "@/app/lang/list/page";

export default async function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ langId: string }>;
}>) {
	const resolvedParams = await params;
	const langId = Number(resolvedParams.langId);

	return (
		<div className="content">
			<div className="flex w-full h-full">
				<Langs langId={langId} />
				{children}
			</div>
		</div>
	);
}
