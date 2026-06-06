import { getList } from "@/app/lang/actions";
import { isAuthenticated } from "@/app/auth/actions";
import Link from "next/link";

export default async function Langs() {
	const isAuth = await isAuthenticated();
	const langs = await getList();

	return (
		<div
			id="langList"
			className="flex w-1/4 flex-col overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden;"
		>
			{isAuth && (
				<div className="flex">
					<Link className="lang-button w-full mt-3 mx-2 p-4 text-2xl font-bold" href="/lang/add">
						Add Language
					</Link>
				</div>
			)}
			<div className="w-full flex flex-col p-4">
				{langs.map((lang) => (
					<Link className="lang-button my-2 p-4" href={`/clue/${lang.id}`} key={lang.id}>
						{lang.name}
					</Link>
				))}
			</div>
		</div>
	);
}
