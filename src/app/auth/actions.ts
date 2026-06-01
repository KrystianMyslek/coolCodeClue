"use server";

import { logIn } from "@/core/auth";
import { cookies } from "next/headers";

type LoginActionProps_prevState = {
	success: boolean;
	error: string | null;
};

export async function loginAction(prevState: LoginActionProps_prevState, formData: FormData) {
	const password = formData.get("password") as string;

	return await logIn(password);
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}
