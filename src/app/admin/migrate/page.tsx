import { migrate } from "@/core/db";

export default async function Migrate() {

	const { currentVersion, newVersion, error } = await migrate();

	if (error) {
		return (
			<>
				<h1>Error during migration: </h1>
				<p>{error.message ? error.message : "An unknown error occurred"}</p>
			</>
		);
	}

	if (currentVersion === newVersion) {
		return (
			<h1>Already at Latest Version __ {currentVersion} __</h1>
		);
	} else {
		return (
		  <h1>Migrated Successfully to Version __ {newVersion} __ from __ {currentVersion} __</h1>
		);
	}

}
