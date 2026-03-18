import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../auth/auth-server";
import { createInsertSchema } from "drizzle-zod";
import { startupTable } from "~/db/schema";
import { db } from "~/db";

const StartUpSchema = createInsertSchema(startupTable);

export const AddStartupFn = createServerFn({ method: "POST" })
	.inputValidator(StartUpSchema.omit({ id: true, owner_id: true }))
	.middleware([authMiddleware])
	.handler(async ({ data, context }) => {
		const { user } = context;
		const { name, description, cin, industry } = data;
		await db
			.insert(startupTable)
			.values({ name, description, owner_id: user.id, cin, industry })
			.returning();
		console.log("Creating startup with data:", data);
	});

export const getMyStartupsFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;
		const startups = await db.query.startupTable.findMany({
			where: eq(startupTable.owner_id, user.id),
		});
		console.log("Listing all startups");
		return startups;
	});
