"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/auth//actions";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			await logoutAction();
			router.push("/");
			router.refresh();
		});
	};

	return (
		<button onClick={handleLogout} disabled={isPending}>
			{isPending ? "..." : "Log out"}
		</button>
	);
}
