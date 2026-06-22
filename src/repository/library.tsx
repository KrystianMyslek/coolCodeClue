import { RepositoryCore } from "@/core/repositoryCore";

export type LibraryType = {
	id: number;
	user_id: number;
	lang_id: number;
	name: string;
	description: string;
	url: string;
};

export default class Library extends RepositoryCore<LibraryType> {
	tableName = "library";

	add(data: Omit<LibraryType, "id">) {
		super.create(data);

		return true;
	}

	edit(id: number, data: Omit<LibraryType, "id" | "lang_id" | "user_id">) {
		super.update(data, { id });

		return true;
	}
}
