import { RepositoryCore } from "@/core/repositoryCore";

export type ClueType = {
	id: number;
	user_id: number;
	lang_id: number;
	title: string;
	content: string;
};

export default class Clue extends RepositoryCore<ClueType> {
	getByLangId(lang_id: number) {
		return super.find({ lang_id });
	}

	add(data: Omit<ClueType, "id">) {
		super.create(data);

		return true;
	}
}
