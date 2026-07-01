"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { add } from "@/app/clue/actions";
import Link from "next/link";
import Error from "@/components/error";
import { Editor } from "@/components/textEditorWrapper";

import "quill/dist/quill.snow.css";
import Loader from "@/components/loader";

export default function AddForm({ langId }: { langId: number }) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(add, {
		success: false,
		errors: null,
	});

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	useEffect(() => {
		if (state.success) {
			router.push(`/clue/${langId}`);
			router.refresh();
		}
	}, [state.success, router, langId]);

	return (
		!state.success && (
			<div className="w-full p-10 flex flex-col">
				<h1 className="text-3xl font-bold mb-4">Add Clue</h1>

				<form className="flex flex-col" action={formAction}>
					<input type="hidden" name="lang_id" value={langId} />

					{state.errors && state.errors.title && <Error error={state.errors.title} />}

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="title"
						type="text"
						placeholder="Clue title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					{state.errors && state.errors.content && <Error error={state.errors.content} />}

					<input type="hidden" name="content" value={content} />

					<Editor value={content} height="400px" onChange={setContent} />

					<div className="flex gap-2">
						<Link href={`/clue/${langId}`}>
							<div className="border bg-red-200 hover:bg-red-300 cursor-pointer font-bold px-4 mt-4 py-2 rounded w-42 flex justify-center">
								Cancel
							</div>
						</Link>

						<button
							disabled={isPending}
							className="border hover:bg-gray-200 cursor-pointer px-4 font-bold mt-4 py-2 rounded w-42"
							type="submit"
						>
							{isPending ? <Loader size={22} /> : "Add Clue"}
						</button>
					</div>
				</form>
			</div>
		)
	);
}
