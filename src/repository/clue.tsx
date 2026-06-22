import { RepositoryCore } from "@/core/repositoryCore";

export type ClueType = {
	id: number;
	user_id: number;
	lang_id: number;
	title: string;
	content: string;
};

export default class Clue extends RepositoryCore<ClueType> {
	tableName = "clue";

	getByLangId(lang_id: number) {
		return super.find({ lang_id });
	}

	add(data: Omit<ClueType, "id">) {
		super.create(data);

		return true;
	}

	edit(id: number, data: Omit<ClueType, "id" | "lang_id" | "user_id">) {
		super.update(data, { id });

		return true;
	}
}
