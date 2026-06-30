import { RepositoryCore } from "@/core/repositoryCore";
import { execute } from "@/core/db";

export type ClueType = {
	id: number;
	user_id: number;
	lang_id: number;
	title: string;
	content: string;
};

export type ClueTypeWithLang = ClueType & { langName: string };

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

	async getAllWithLangName(): Promise<ClueTypeWithLang[]> {
		const query = `SELECT c.* , l.name as langName 
			FROM ${this.tableName} c
			LEFT JOIN lang l ON (c.lang_id = l.id)`;

		return (await execute(query)) as ClueTypeWithLang[];
	}
}
