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

		const rows = (await execute(`SELECT * FROM ${this.getTableName()} WHERE ${whereClause} LIMIT 1`)) as
			| T[]
			| null;

		return rows && rows[0];
	}

	async create(data: Record<string, string | number>): Promise<T> {
		const columns = Object.keys(data).join(", ");
		const values_sql = Object.values(data)
			.map(() => `?`)
			.join(", ");

		const values = Object.values(data);

		return (await execute(
			`INSERT INTO ${this.getTableName()} (${columns}) VALUES (${values_sql})`,
			values,
		)) as T;
	}

	async update(
		data: Record<string, string | number>,
		condition: Record<string, string | number>,
	): Promise<T> {
		const setClause = Object.keys(data)
			.map((key) => `${key} = ?`)
			.join(", ");

		const whereClause = Object.keys(condition)
			.map((key) => `${key} = ?`)
			.join(" AND ");

		const values = Object.values({ ...data, ...condition });

		return (await execute(
			`UPDATE ${this.getTableName()} SET ${setClause} WHERE ${whereClause}`,
			values,
		)) as T;
	}
}
