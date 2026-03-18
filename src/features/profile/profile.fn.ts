import { createServerFn } from "@tanstack/react-start";
import { createInsertSchema } from "drizzle-zod";
import { authMiddleware } from "~/features/auth/auth-server";
import { eq } from "drizzle-orm";
import { profileTable } from "~/db/schema";
import { db } from "~/db";

const ProfileSchema = createInsertSchema(profileTable);

export const getMyProfile = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;
		const profile = await db.query.profileTable.findFirst({
			where({ id }, { eq }) {
				return eq(id, user.id);
			},
		});
		if (profile === undefined) {
			return null;
		}
		return profile;
	});

export const getPlanFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { user } = context;
		const profile = await db.query.profileTable.findFirst({
			where({ id }, { eq }) {
				return eq(id, user.id);
			},
		});
		if (profile === undefined) {
			return "free";
		}
		return profile.plan;
	});

export const createProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(
		ProfileSchema.omit({ id: true, email: true, avatar_url: true }),
	)
	.handler(async ({ data, context }) => {
		const { user } = context;
		const username = await db.query.profileTable.findFirst({
			where({ username }, { eq }) {
				return eq(username, data.username);
			},
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
	});

export const updateProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(ProfileSchema.partial())
	.handler(async ({ data, context }) => {
		const { user } = context;
		await db
			.update(profileTable)
			.set({ ...data })
			.where(eq(profileTable.id, user.id));
		return;
	});
