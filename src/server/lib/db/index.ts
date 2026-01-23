import { neon } from "@neondatabase/serverless";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env/server";

import * as schema from "~/server/lib/db/schema";

let driver: ReturnType<typeof neon> | null = null;

export const getDatabase = createServerOnlyFn(() => {
	if (!driver) {
		driver = neon(env.DATABASE_URL);
	}
	return drizzle({ client: driver, schema, casing: "snake_case" });
});
