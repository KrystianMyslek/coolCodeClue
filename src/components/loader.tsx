import { Oval } from "react-loader-spinner";

export default function Loader({ size, pageCenter }: { size: number; pageCenter?: boolean }) {
	const centerStyles = pageCenter ? " h-3/5" : "";

	return (
		<div
			className={`disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center justify-center ${centerStyles}`}
		>
			<Oval visible={true} color="#444" secondaryColor="#aaa" height={size} width={size} />
		</div>
	);
}
