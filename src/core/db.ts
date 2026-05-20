import { promises as fs } from "fs";
import mysql from "mysql2/promise";

const connection = async () => {
	try {
		return await mysql.createConnection({
			host: process.env.MYSQL_HOST,
			port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
		});
	} catch (error) {
		console.error("Error creating database connection:", error);
		throw error;
	}
};

const loadMigrations = async (type: string): Promise<string[]> => {
	const filename = `src/migrations/migration-${type.toLowerCase()}.sql`;
	const migrations: string[] = [];

	try {
		const content = await fs.readFile(filename, "utf-8");
		migrations.push(
			...content
				.replace(/--.*$/gm, "")
				.replace(/\/\*[\s\S]*?\*\//g, "")
				.split(";")
				.map((query) => query.replace(/\r?\n|\r/g, " ").trim())
				.filter((query) => query.length > 0),
		);
	} catch (error) {
		console.error(`Error reading migration file ${filename}:`, error);
	}

	return migrations;
};

export const migrate = async (type: string) => {
	try {
		const conn = await connection();
		const migrations = await loadMigrations(type);

		migrations.forEach((migration) => {
			conn.execute(migration);
		});
		console.log("Database migrated successfully.");
	} catch (error) {
		console.error("Error migrating:", error);
		throw error;
	}
};

export const query = async (sql: string, params?: string[]) => {
	try {
		const conn = await connection();
		return await conn.execute(sql, params);
	} catch (error) {
		console.error("Error executing query:", error);
		throw error;
	}
};
