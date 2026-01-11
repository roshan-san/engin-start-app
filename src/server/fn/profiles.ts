import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { authMiddleware } from "~/auth/auth";
import { getDatabase } from "~/db";
import { profileTable } from "~/db/schema";
import { isNeonDrizzleQueryError } from "../types";

const ProfileSchema = createInsertSchema(profileTable);
const db = getDatabase();

export const getMyProfile = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		try {
			const { user } = context;
			const profile = await db.query.profileTable.findFirst({
				where: eq(profileTable.id, user.id),
			});
			return profile || null;
		} catch (error) {
			if (isNeonDrizzleQueryError(error)) {
				throw new Response("Database Error ", { status: 400 });
			}
			throw new Response("Unknown Error", { status: 500 });
		}
	});

export const createProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		ProfileSchema.omit({ id: true, email: true, avatar_url: true }),
	)
	.handler(async ({ data, context }) => {
		try {
			const { user } = context;
			const username = await db.query.profileTable.findFirst({
				where: eq(profileTable.username, data.username),
			});
			if (username) {
				throw new Response("Sorry the Username is already taken", {
					status: 400,
				});
			}
			await db.insert(profileTable).values({
				id: user.id,
				email: user.email,
				full_name: data.full_name,
				username: data.username,
				avatar_url: user.image,
				onboarding_complete: true,
			});
			return;
		} catch (error) {
			if (isNeonDrizzleQueryError(error)) {
				if (error.cause.code === "23505") {
					throw new Response("Profile already exists", {
						status: 400,
					});
				}
			}
		}
	});

export const updateProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(ProfileSchema.partial())
	.handler(async ({ data, context }) => {
		try {
			const { user } = context;
			await db
				.update(profileTable)
				.set({ ...data })
				.where(eq(profileTable.id, user.id));
			return;
		} catch (error) {
			if (isNeonDrizzleQueryError(error)) {
				throw new Response("Neon Error", { status: 400 });
			}
			throw new Response("Error updating profile");
		}
	});
