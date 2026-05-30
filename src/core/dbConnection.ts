import mysql from "mysql2/promise";

declare global {
	var connection: mysql.Pool | undefined;
}

const globalForMysql = globalThis as typeof globalThis & {
	connection?: mysql.Pool;
};

export const connection =
	globalForMysql.connection ||
	mysql.createPool({
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		waitForConnections: true,
		connectionLimit: 2,
		queueLimit: 0,
	});

if (process.env.NODE_ENV !== "production") {
	globalForMysql.connection = connection;
}
