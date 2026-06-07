"use server";

import Repository from "@/core/repository";
import Clue from "@/repository/clue";

type AddActionProps_prevState = {
	success: boolean;
	error: string | null;
};

export async function getRandomList() {
	const cluesRepo = Repository.create("clue") as Clue;
	const clues = await cluesRepo.getAll();

	return clues;
}

export async function get(lang_id: string) {
	const cluesRepo = Repository.create("clue") as Clue;
	const clues = await cluesRepo.find({ lang_id });

	return clues;
}

export async function add(prevState: AddActionProps_prevState, formData: FormData) {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;
	const lang_id = parseInt(formData.get("lang_id") as string);

	if (!title) {
		return { success: false, error: "Title is required." };
	}

	if (!content) {
		return { success: false, error: "Content is required." };
	}

	const user_id = 1;

	const ClueRepo = Repository.create("clue") as Clue;
	ClueRepo.add({ user_id, lang_id, title, content });

	return { success: true, error: null };
}
