"use server";

import Repository from "@/core/repository";
import Lang from "@/repository/lang";

type AddActionProps_prevState = {
	success: boolean;
	error: string | null;
};

export async function getList() {
	const langs = await Repository.create("lang").getAll();

	return langs;
}

export async function add(prevState: AddActionProps_prevState, formData: FormData) {
	const name = formData.get("name") as string;

	if (!name) {
		return { success: false, error: "Name is required." };
	}

	const LangRepo = Repository.create("lang") as Lang;
	LangRepo.add({ name });

	return { success: true, error: null };
}
