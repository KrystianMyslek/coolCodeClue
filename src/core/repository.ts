import User from "@/repository/user";
import Lang from "@/repository/lang";

export default class Repository {
	className: string | null = null;

	static create(className: string) {
		if (!className) {
			throw new Error("Class name is required");
		}

		switch (className.toLowerCase()) {
			case "user":
				return new User();
			case "lang":
				return new Lang();
			default:
				throw new Error(`Unknown repository: ${className}`);
		}
	}
}
