"use server";

import Repository from "@/core/repository";
import Clue, { ClueType } from "@/repository/clue";

type add_props_prevState = {
	success: boolean;
	errors: ClueErrorType | null;
};

type ClueErrorType = {
	title: string | false;
	content: string | false;
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

export async function add(prevState: add_props_prevState, formData: FormData) {
	const [valid, errors] = validate(formData);

	if (!valid) return { success: false, errors: errors };

	const { title, content, lang_id } = parseData(formData);

	const user_id = 1;

	const ClueRepo = Repository.create("clue") as Clue;
	ClueRepo.add({ user_id, lang_id, title, content });

	return { success: true, errors: null };
}

function parseData(formData: FormData): Omit<ClueType, "id" | "user_id"> {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;
	const lang_id = parseInt(formData.get("lang_id") as string);

	return { title, content, lang_id };
}

function validate(formData: FormData): [boolean, ClueErrorType] {
	const errors: ClueErrorType = {
		title: false,
		content: false,
	};

	const { title, content } = parseData(formData);

	if (!title) errors.title = "Title is required.";
	if (!content) errors.content = "Content is required.";

	return [Object.values(errors).every((value) => value === false), errors];
}
