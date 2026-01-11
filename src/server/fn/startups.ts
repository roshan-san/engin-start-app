import { createServerFn } from "@tanstack/react-start";
import { getDatabase } from "~/db";
import { startupTable } from "~/db/schema/startups.schema";

const db = getDatabase();
export const getMyStartupsFn = createServerFn().handler(async () => {
	const startups = await db.select().from(startupTable);
	return startups;
});
