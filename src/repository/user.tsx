import { RepositoryCore } from "@/core/repositoryCore";

export type UserType = {
	id: number;
	name: string;
	password: string;
};

export default class User extends RepositoryCore<UserType> {}
