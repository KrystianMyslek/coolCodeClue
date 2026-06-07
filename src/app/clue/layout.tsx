import Langs from "../lang/list/page";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="content">
			<div className="flex w-full h-full">
				<Langs />
				{children}
			</div>
		</div>
	);
}
