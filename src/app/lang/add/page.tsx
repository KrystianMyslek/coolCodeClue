"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { add } from "@/app/lang/actions";
import Loader from "@/components/loader";

export default function Add() {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(add, {
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
			<div className="w-full p-10 flex flex-col">
				<h1 className="text-3xl font-bold mb-4">Add Language</h1>

				<form action={formAction}>
					<input
						className="w-lg border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="name"
						type="text"
						placeholder="Language Name"
					/>

					{state.error && (
						<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 font-medium">
							{state.error}
						</div>
					)}

					<button
						disabled={isPending}
						className="border hover:bg-gray-200 cursor-pointer px-4 font-bold mt-4 py-2 rounded flex items-center justify-center"
						type="submit"
					>
						{isPending ? <Loader size={22} /> : "Add Language"}
					</button>
				</form>
			</div>
		)
	);
}
