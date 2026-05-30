import { connection } from "./dbConnection";
import { readdirSync, readFileSync, writeFileSync } from "fs";

const migrationsPath = `src/migrations/`;

const loadMigrations = async (version: number): Promise<string[][]> => {
	const migrations: string[][] = [];

	try {
		const files = readdirSync(migrationsPath)
			.filter((file) => file !== "version")
			.filter((file) => {
				const match = file.match(/(\d+)\.sql/);
				if (match) {
					const fileVersion = parseInt(match[1]);
					return fileVersion > version;
				}
			});

		for (const file of files) {
			const content = readFileSync(`${migrationsPath}/${file}`, "utf-8");
			migrations.push([
				...content
					.replace(/--.*$/gm, "")
					.replace(/\/\*[\s\S]*?\*\//g, "")
					.split(";")
					.map((query) => query.replace(/\r?\n|\r/g, " ").trim())
					.filter((query) => query.length > 0),
			]);
		}
	} catch (error) {
		console.error(`Error reading migration files:`, error);
	}

	return migrations;
};

const getMigrationVersion = (): number => {
	let version = 0;
	try {
		version = parseInt(readFileSync(`${migrationsPath}/version`, "utf8").trim());
	} catch (error) {
		// File not exists, return default version
		if ((error as { code: string }).code === "ENOENT") {
			return version;
		} else {
			throw error;
		}
	}

	return version;
};

const updateMigrationVersion = (version: number) => {
	writeFileSync(`${migrationsPath}/version`, version.toString(), "utf8");
};

export const migrate = async () => {
	const currentVersion = getMigrationVersion();
	let newVersion = currentVersion;
	let error: Error | null = null;

	const migrations = await loadMigrations(currentVersion);

	for (const queries of migrations) {
		let successfully_executed_migrations = 0;
		for (const query of queries) {
			try {
				await connection.execute(query);
				successfully_executed_migrations++;
			} catch (err) {
				console.error("Error executing query:", err);

				error = err as Error;
			}
		}

		if (queries.length === successfully_executed_migrations) {
			newVersion++;
		}
	}

	updateMigrationVersion(newVersion);

	return {
		currentVersion,
		newVersion,
		error,
	};
};

export const query = async (sql: string, params?: string[]) => {
	try {
		return await connection.execute(sql, params);
	} catch (error) {
		console.error("Error executing query:", error);
		throw error;
	}
};
