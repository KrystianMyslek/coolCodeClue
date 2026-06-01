import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import Repository from "./repository";

export const isAuthenticated = async (): Promise<boolean> => {
	const cookieStore = await cookies();
	const session = cookieStore.get("session");

	return !!session;
};

export const signUp = async (name: string, password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);

	const userRepo = Repository.create("user");

	await userRepo.create({ name, password: hashedPassword });

	await logIn(password);
};

export const logIn = async (password: string) => {
	if (!password) {
		return { success: false, error: "Password is required." };
	}

	const userRepo = Repository.create("user");

	const user = await userRepo.getAll().then((users) => {
		return users?.find((u) => bcrypt.compareSync(password, u.password));
	});

	if (!user) {
		return { success: false, error: "Invalid credentials." };
	} else {
		const sessionToken = crypto.randomBytes(32).toString("hex");

		const cookieStore = await cookies();
		cookieStore.set("session", sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24,
			path: "/",
		});
	}

	return { success: true, error: null };
};

export const logOut = async () => {
	const cookieStore = await cookies();
	cookieStore.delete("session");
};
