"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("./textEditor"), {
	ssr: false,
	loading: () => (
		<div className="h-64 w-full bg-gray-50 border border-gray-200 rounded-xl animate-pulse flex items-center justify-center text-sm text-gray-400">
			Loading texteditor...
		</div>
	),
});
