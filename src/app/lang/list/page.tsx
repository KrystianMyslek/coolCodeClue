import { getList } from "@/app/lang/actions";
import { isAuthenticated } from "@/app/auth/actions";
import Link from "next/link";

export default async function Langs({ langId = 0 }: { langId?: number }) {
	const isAuth = await isAuthenticated();
	const langs = await getList();

	return (
		<div
			id="langList"
			className="flex w-1/5 flex-col overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden;"
		>
			{isAuth && (
				<Link className="primary-button mt-3 mx-1 p-4 text-2xl font-bold" href="/lang/add">
					Add Language
				</Link>
			)}
			<div className="w-full flex flex-col py-3 px-2">
				{langs.map((lang) => (
					<Link
						className={`mb-2 p-4 ${lang.id == langId ? "third-button" : "secondary-button"}`}
						href={`/clue/${lang.id}`}
						key={lang.id}
					>
						{lang.name}
					</Link>
				))}
			</div>
		</div>
	);
}
