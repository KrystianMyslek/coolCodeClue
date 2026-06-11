"use client";

import { useEffect, useRef } from "react";
import type Quill from "quill";

import "quill/dist/quill.snow.css";

interface QuillEditorProps {
	value: string;
	height?: string;
	onChange: (content: string) => void;
}

export default function QuillEditor({ value, height, onChange }: QuillEditorProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const quillRef = useRef<Quill | null>(null);
	const onChangeRef = useRef(onChange);

	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const editorContainer = container.appendChild(document.createElement("div"));

		let quillInstance: Quill;

		import("quill").then((QuillModule) => {
			const QuillClass = QuillModule.default;

			quillInstance = new QuillClass(editorContainer, {
				theme: "snow",
				placeholder: "Start typing...",

				modules: {
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						["bold", "italic", "underline", "strike"],
						[{ list: "ordered" }, { list: "bullet" }],
						["link", "code-block", "image", "clean"],
					],
				},
			});

			quillRef.current = quillInstance;

			if (value) {
				quillInstance.clipboard.dangerouslyPasteHTML(value);
			}

			if (height) {
				quillInstance.container.style.height = height;
			}

			quillInstance.on("text-change", () => {
				const html = editorContainer.querySelector(".ql-editor")?.innerHTML || "";
				onChangeRef.current(html);
			});
		});

		return () => {
			if (quillInstance) {
				quillRef.current = null;
			}
			container.innerHTML = "";
		};
	}, []);

	return (
		<div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
			<div ref={containerRef} className="prose max-w-none" />
		</div>
	);
}
