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
	const clues = await cluesRepo.getAllWithLangName();

	return clues;
}

export async function getList(lang_id: number) {
	const cluesRepo = Repository.create("clue") as Clue;
	const clues = await cluesRepo.find({ lang_id });

	return clues;
}

export async function get(id: number) {
	const cluesRepo = Repository.create("clue") as Clue;
	const clue = await cluesRepo.findOne({ id });

	return clue;
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

export async function edit(prevState: add_props_prevState, formData: FormData) {
	const [valid, errors] = validate(formData);

	if (!valid) return { success: false, errors: errors };

	const { id, title, content } = parseEditData(formData);

	const ClueRepo = Repository.create("clue") as Clue;
	ClueRepo.edit(id, { title, content });

	return { success: true, errors: null };
}

function parseData(formData: FormData): Omit<ClueType, "id" | "user_id"> {
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;
	const lang_id = Number(formData.get("lang_id"));

	return { title, content, lang_id };
}

function parseEditData(formData: FormData): Omit<ClueType, "lang_id" | "user_id"> {
	const id = Number(formData.get("id"));
	const title = formData.get("title") as string;
	const content = formData.get("content") as string;

	return { id, title, content };
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
