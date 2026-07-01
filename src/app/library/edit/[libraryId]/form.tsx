"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { edit } from "@/app/library/actions";
import Link from "next/link";
import Error from "@/components/error";
import { LibraryType } from "@/repository/library";
import { Editor } from "@/components/textEditorWrapper";

import "quill/dist/quill.snow.css";
import Loader from "@/components/loader";

export default function EditForm({ library }: { library: LibraryType }) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(edit, {
		success: false,
		errors: null,
	});

	const [name, setName] = useState<string>(library.name);
	const [url, setUrl] = useState<string>(library.url);
	const [description, setDescription] = useState<string>(library.description);

	useEffect(() => {
		if (state.success) {
			router.push(`/library/${library.lang_id}`);
			router.refresh();
		}
	}, [state.success, router, library.lang_id]);

	return (
		!state.success && (
			<div className="w-full p-10 flex flex-col">
				<h1 className="text-3xl font-bold mb-4">Edit Library</h1>

				<form className="flex flex-col" action={formAction}>
					<input type="hidden" name="id" value={library.id} />

					{state.errors && state.errors.name && <Error error={state.errors.name} />}

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="name"
						type="text"
						placeholder="Library name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					{state.errors && state.errors.url && <Error error={state.errors.url} />}

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="url"
						type="text"
						placeholder="Library url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>

					{state.errors && state.errors.description && <Error error={state.errors.description} />}

					<input type="hidden" name="description" value={description} />

					<Editor value={description} height="400px" onChange={setDescription} />

					<div className="flex gap-2">
						<Link href={`/library/${library.lang_id}`}>
							<div className="border bg-red-200 hover:bg-red-300 cursor-pointer font-bold px-4 mt-4 py-2 rounded w-42 flex justify-center">
								Cancel
							</div>
						</Link>

						<button
							disabled={isPending}
							className="border hover:bg-gray-200 cursor-pointer px-4 font-bold mt-4 py-2 rounded w-42"
							type="submit"
						>
							{isPending ? <Loader size={22} /> : "Save Library"}
						</button>
					</div>
				</form>
			</div>
		)
	);
}
