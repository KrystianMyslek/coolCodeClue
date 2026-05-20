import { query } from "@/core/db";

export default class Repository {
	private static getTableName() {
		return this.name.toLowerCase() + "s";
	}

	static async getAll() {
		return await query(`SELECT * FROM ${this.getTableName()}`);
	}

	static async getById(id: number) {
		return await query(`SELECT * FROM ${this.getTableName()} WHERE id = ${id}`);
	}
}
