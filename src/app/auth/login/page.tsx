"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/auth/actions";
import Loader from "@/components/loader";

export default function LoginPage() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(login, {
		success: false,
		error: null,
	});

	useEffect(() => {
		if (state.success) {
			router.push("/");
			router.refresh();
		}
	}, [state.success, router]);

	return (
		!state.success && (
			<div className="w-xl mx-auto p-10 flex flex-col items-center gap-6">
				<h1 className="text-3xl font-bold mb-4">Login to add new content</h1>

				<form action={formAction} className="w-full">
					<input
						className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="password"
						type="password"
						placeholder="Password"
					/>

					{state.error && (
						<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 font-medium">
							{state.error}
						</div>
					)}

					<button
						disabled={isPending}
						className="border hover:bg-gray-200 cursor-pointer w-full font-bold mt-4 py-2 rounded flex items-center justify-center"
						type="submit"
					>
						{isPending ? <Loader size={22} /> : "Log in"}
					</button>
				</form>
			</div>
		)
	);
}
