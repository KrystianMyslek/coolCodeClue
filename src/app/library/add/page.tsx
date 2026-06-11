"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { add } from "@/app/library/actions";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";

import { Editor } from "@/components/textEditorWrapper";

import "quill/dist/quill.snow.css";

export default function Add() {
	const searchParams = useSearchParams();
	const langId = searchParams.get("langId") || 1;

	const router = useRouter();
	const [state, formAction, isPending] = useActionState(add, {
		success: false,
		errors: null,
	});

	const [name, setName] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	useEffect(() => {
		if (state.success) {
			router.push(`/library/${langId}`);
			router.refresh();
		}
	}, [state.success, router, langId]);

	return (
		!state.success && (
			<div className="w-full p-10 flex flex-col">
				<h1 className="text-3xl font-bold mb-4">Add Library</h1>

				<form className="flex flex-col" action={formAction}>
					<input type="hidden" name="lang_id" value={langId} />

					{}

					{state.errors && state.errors.name && (
						<div className="rounded-lg bg-red-50 p-4 mb-4 text-sm text-red-600 font-medium">
							{state.errors.name}
						</div>
					)}

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="name"
						type="text"
						placeholder="Library name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					{state.errors && state.errors.url && (
						<div className="rounded-lg bg-red-50 p-4 mb-4 text-sm text-red-600 font-medium">
							{state.errors.url}
						</div>
					)}

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="url"
						type="text"
						placeholder="Library url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>

					{state.errors && state.errors.description && (
						<div className="rounded-lg bg-red-50 p-4 mb-4 text-sm text-red-600 font-medium">
							{state.errors.description}
						</div>
					)}

					<input type="hidden" name="description" value={description} />

					<Editor value={description} height="400px" onChange={setDescription} />

					<button
						disabled={isPending}
						className="border hover:bg-gray-200 cursor-pointer px-4 font-bold mt-4 py-2 rounded w-42"
						type="submit"
					>
						{isPending ? (
							<div className="disabled:cursor-not-allowed disabled:opacity-50">
								<Oval
									visible={true}
									color="#444"
									secondaryColor="#aaa"
									height="22"
									width="22"
								/>
							</div>
						) : (
							"Add Library"
						)}
					</button>
				</form>
			</div>
		)
	);
}
