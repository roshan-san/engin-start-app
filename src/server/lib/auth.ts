import { betterAuth } from "better-auth/minimal";
import {
	createMiddleware,
	createServerFn,
	createServerOnlyFn,
} from "@tanstack/react-start";
import { db } from "~/server/lib/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "~/env/server";
import { redirect } from "@tanstack/react-router";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const getBetterAuth = createServerOnlyFn(() => {
	return betterAuth({
		baseURL: env.BASE_URL,
		telemetry: { enabled: false },
		database: drizzleAdapter(db, { provider: "pg" }),
		plugins: [tanstackStartCookies()],
		session: {
			cookieCache: { enabled: true },
		},
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
			},
		},
	});
});

export const authMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		//cookie better authta kuduthu , user and session check panna use panrom
		const auth = getBetterAuth();
		const obj = await auth.api.getSession({
			headers: request.headers,
		});

		if (!obj) {
			throw redirect({ to: "/login" });
		}
		return next({
			context: {
				user: obj.user,
				session: obj.session,
			},
		});
	},
);

export const getSessionFn = createServerFn()
	.middleware([authMiddleware])
	.handler(({ context }) => {
		const { session, user } = context;
		return {
			session,
			user,
		};
	});
