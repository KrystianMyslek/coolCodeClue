"use server";

import { cookies } from "next/headers";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

import Repository from "@/core/repository";
import User from "@/repository/user";

type LoginActionProps_prevState = {
	success: boolean;
	error: string | null;
};

export const isAuthenticated = async (): Promise<boolean> => {
	const cookieStore = await cookies();
	const session = cookieStore.get("session");

	return !!session;
};

export async function signUp(name: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	const userRepo = Repository.create("user") as User;

	await userRepo.create({ name, password: hashedPassword });

	return true;
}

export async function login(prevState: LoginActionProps_prevState, formData: FormData) {
	const password = formData.get("password") as string;

	if (!password) {
		return { success: false, error: "Password is required." };
	}

	const userRepo = Repository.create("user") as User;

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
			secure: process.env.APP_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 24,
			path: "/",
		});
	}

	return { success: true, error: null };
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
