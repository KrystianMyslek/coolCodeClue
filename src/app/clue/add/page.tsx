"use client";

import { useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { add } from "@/app/clue/actions";
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
		error: null,
	});

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	useEffect(() => {
		if (state.success) {
			router.push("/");
			router.refresh();
		}
	}, [state.success, router]);

	return (
		!state.success && (
			<div className="w-full p-10 flex flex-col">
				<h1 className="text-3xl font-bold mb-4">Add Clue</h1>

				<form className="flex flex-col" action={formAction}>
					<input type="hidden" name="lang_id" value={langId} />

					<input
						className="w-lg border mb-4 border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2"
						name="title"
						type="text"
						placeholder="Clue title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<input type="hidden" name="content" value={content} />

					<Editor value={content} height="400px" onChange={setContent} />

					{state.error && (
						<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 font-medium">
							{state.error}
						</div>
					)}

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
							"Add Clue"
						)}
					</button>
				</form>
			</div>
		)
	);
}
