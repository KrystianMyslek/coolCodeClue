import User from "@/repository/user";

export default class Repository {
	className: string | null = null;

	static create(className: string) {
		if (!className) {
			throw new Error("Class name is required");
		}

		switch (className.toLowerCase()) {
			case "user":
				return new User();
			default:
				throw new Error(`Unknown repository: ${className}`);
		}
	}
}
