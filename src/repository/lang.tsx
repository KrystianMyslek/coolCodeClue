import { RepositoryCore } from "@/core/repositoryCore";

export type LangType = {
	id: number;
	name: string;
};

export default class Lang extends RepositoryCore<LangType> {
	add(data: Omit<LangType, "id">) {
		super.create({ name: data.name });

		return true;
	}
}
