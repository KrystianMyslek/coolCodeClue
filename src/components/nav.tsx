import { isAuthenticated } from "@/app/auth/actions";
import Link from "next/link";
import LogoutButton from "./logoutButton";

export default async function Nav() {
	const isAuth = await isAuthenticated();

	return (
		<div className="nav">
			<Link href="/">CoolCodeClue</Link>
			{isAuth && <LogoutButton />}
			{!isAuth && <Link href="/auth/login">login</Link>}
		</div>
	);
}
