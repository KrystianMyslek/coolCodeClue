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
	add(data: Omit<LibraryType, "id">) {
		super.create(data);

		return true;
	}
}
