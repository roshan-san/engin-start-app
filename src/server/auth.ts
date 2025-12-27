import { getRequest } from "@tanstack/react-start/server";
import { createMiddleware, createServerFn } from "@tanstack/react-start";

import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { env } from "~/env/server";
import { db } from "~/lib/db";

export const auth = betterAuth({
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

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const { response } = await auth.api.getSession({
		headers: getRequest().headers,
		returnHeaders: true,
	});
	if (!response) {
		throw Error("UNAUTHORISED");
	}
	return next({
		context: { user: response?.user, session: response?.session },
	});
});
