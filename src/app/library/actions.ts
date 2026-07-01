"use server";

import Repository from "@/core/repository";
import Library, { LibraryType } from "@/repository/library";

type add_props_prevState = {
	success: boolean;
	errors: LibraryErrorType | null;
};

type LibraryErrorType = {
	name: string | false;
	url: string | false;
	description: string | false;
};

export async function getList(lang_id: number) {
	const libraryRepo = Repository.create("library") as Library;
	const libraries = await libraryRepo.find({ lang_id });

	return libraries;
}

export async function get(id: number) {
	const libraryRepo = Repository.create("library") as Library;
	const library = await libraryRepo.findOne({ id });

	return library;
}

export async function add(prevState: add_props_prevState, formData: FormData) {
	const [valid, errors] = validate(formData);

	if (!valid) return { success: false, errors: errors };

	const { name, description, url, lang_id } = parseData(formData);

	const user_id = 1;

	const libraryRepo = Repository.create("library") as Library;
	libraryRepo.add({ user_id, lang_id, name, description, url });

	return { success: true, errors: null };
}

export async function edit(prevState: add_props_prevState, formData: FormData) {
	const [valid, errors] = validate(formData);

	if (!valid) return { success: false, errors: errors };

	const { id, name, description, url } = parseEditData(formData);

	const libraryRepo = Repository.create("library") as Library;
	libraryRepo.edit(id, { name, description, url });

	return { success: true, errors: null };
}

function parseData(formData: FormData): Omit<LibraryType, "id" | "user_id"> {
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const url = formData.get("url") as string;
	const lang_id = Number(formData.get("lang_id"));

	return { name, description, url, lang_id };
}

function parseEditData(formData: FormData): Omit<LibraryType, "lang_id" | "user_id"> {
	const id = Number(formData.get("id"));
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const url = formData.get("url") as string;

	return { id, name, description, url };
}

function validate(formData: FormData): [boolean, LibraryErrorType] {
	const errors: LibraryErrorType = {
		name: false,
		url: false,
		description: false,
	};

	const { name, description, url } = parseData(formData);

	if (!name) errors.name = "Name is required.";
	if (!url) errors.url = "Url is required.";
	if (!description) errors.description = "Description is required.";

	return [Object.values(errors).every((value) => value === false), errors];
}
