import { execute } from "@/core/db";

export class RepositoryCore<T> {
	protected tableName = "";

	private getTableName() {
		return this.tableName || this.constructor.name.toLowerCase();
	}

	async getAll(): Promise<T[]> {
		return (await execute(`SELECT * FROM ${this.getTableName()}`)) as T[];
	}

	async getById(id: number): Promise<T | null> {
		return (await execute(`SELECT * FROM ${this.getTableName()} WHERE id = ${id}`)) as T | null;
	}

	async find(condition: Record<string, string | number>): Promise<T[] | null> {
		const whereClause = Object.entries(condition)
			.map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
			.join(" AND ");

		return (await execute(`SELECT * FROM ${this.getTableName()} WHERE ${whereClause}`)) as T[] | null;
	}

	async findOne(condition: Record<string, string | number>): Promise<T | null> {
		const whereClause = Object.entries(condition)
			.map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
			.join(" AND ");

		return (await execute(
			`SELECT * FROM ${this.getTableName()} WHERE ${whereClause} LIMIT 1`,
		)) as T | null;
	}

	async create(data: Record<string, string | number>): Promise<T> {
		const columns = Object.keys(data).join(", ");
		const values = Object.values(data)
			.map((value) => (typeof value === "string" ? `'${value}'` : value))
			.join(", ");

		return (await execute(`INSERT INTO ${this.getTableName()} (${columns}) VALUES (${values})`)) as T;
	}
}
