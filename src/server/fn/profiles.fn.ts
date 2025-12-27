import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { db } from "~/lib/db";
import { profileTable } from "~/lib/db/schema";
import { authMiddleware } from "../auth";

const ProfileSchema = createInsertSchema(profileTable);

export const getMyProfile = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;
		const [profile] = await db
			.select()
			.from(profileTable)
			.where(eq(profileTable.id, user.id))
			.limit(1);
		return profile || null;
	});

export const createProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		ProfileSchema.omit({ id: true, email: true, avatar_url: true }),
	)
	.handler(async ({ data, context }) => {
		const { user } = context;
		const [returned] = await db
			.insert(profileTable)
			.values({
				id: user.id,
				email: user.email,
				full_name: data.full_name,
				username: data.username,
				avatar_url: user.image,
			})
			.returning();
		return returned;
	});
export const updateProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(ProfileSchema.partial())
	.handler(async ({ data, context }) => {
		const { user } = context;
		const [returned] = await db
			.update(profileTable)
			.set({
				...data,
			})
			.where(eq(profileTable.id, user.id))
			.returning();
		return returned;
	});
