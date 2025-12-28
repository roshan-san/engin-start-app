import { getRequest } from "@tanstack/react-start/server";
import {
	createMiddleware,
	createServerFn,
	createServerOnlyFn,
} from "@tanstack/react-start";

import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { env } from "~/env/server";
import { getDatabase } from "~/lib/db";
import { redirect } from "@tanstack/react-router";

const db = getDatabase();

let authServer: ReturnType<typeof betterAuth> | null = null;

export const getAuthServer = createServerOnlyFn(() => {
	if (!authServer) {
		authServer = betterAuth({
			baseURL: env.BASE_URL,
			telemetry: { enabled: false },

			database: drizzleAdapter(db, {
				provider: "pg",
			}),

			plugins: [tanstackStartCookies()],

			session: {
				cookieCache: { enabled: false },
			},

			socialProviders: {
				google: {
					clientId: env.GOOGLE_CLIENT_ID,
					clientSecret: env.GOOGLE_CLIENT_SECRET,
				},
			},
		});
	}
	return authServer;
});
const auth = getAuthServer();

export const getAuth = createServerFn({ method: "GET" }).handler(async () => {
	const { response } = await auth.api.getSession({
		headers: getRequest().headers,
		returnHeaders: true,
	});
	if (!response) {
		return { user: null, session: null };
	}
	return {
		user: response.user,
		session: response.session,
	};
});

export const authMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const { response } = await auth.api.getSession({
			headers: request.headers,
			returnHeaders: true,
		});
		if (!response) {
			throw redirect({ to: "/login" });
		}
		return next({
			context: { user: response.user, session: response.session },
		});
	},
);
