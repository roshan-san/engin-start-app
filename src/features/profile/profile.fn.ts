import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema } from "drizzle-zod";
import { authMiddleware } from "~/features/auth/auth-server";
import { eq } from "drizzle-orm";
import { profileTable } from "~/db/schema";
import { db } from "~/db";

// Base schema
const ProfileSchema = createInsertSchema(profileTable);

// GET MY PROFILE
export const getMyProfileFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;

		const profile = await db.query.profileTable.findFirst({
			where: eq(profileTable.id, user.id),
		});

		return profile ?? null;
	});

// CREATE PROFILE
export const createMyProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		ProfileSchema.omit({
			id: true,
			email: true,
			avatar_url: true,
		}),
	)
	.handler(async ({ data, context }) => {
		const { user } = context;

		try {
			await db.insert(profileTable).values({
				id: user.id,
				email: user.email,
				full_name: data.full_name,
				username: data.username,
				avatar_url: user.image,
				onboarding_complete: true,
			});
		} catch (err) {
			console.error("Profile creation failed:", err);
			throw new Response("Username already taken", { status: 400 });
		}

		const profile = await db.query.profileTable.findFirst({
			where: eq(profileTable.id, user.id),
		});

		return profile;
	});

// UPDATE PROFILE
export const updateMyProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		ProfileSchema.pick({
			full_name: true,
			username: true,
		}).partial(),
	)
	.handler(async ({ data, context }) => {
		const { user } = context;

		try {
			await db
				.update(profileTable)
				.set({ ...data })
				.where(eq(profileTable.id, user.id));
		} catch (err) {
			console.error("Profile update failed:", err);
			throw new Response("Update failed", { status: 400 });
		}

		// return updated profile for react-query sync
		const updatedProfile = await db.query.profileTable.findFirst({
			where: eq(profileTable.id, user.id),
		});

		return updatedProfile;
	});
