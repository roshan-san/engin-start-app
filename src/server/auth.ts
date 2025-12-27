import {
	getRequest,
	setResponseHeader,
	setResponseStatus,
} from "@tanstack/react-start/server";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { env } from "~/env/server";
import { db } from "~/lib/db";

const getAuthConfig = createServerOnlyFn(() =>
	betterAuth({
		baseURL: env.VITE_BASE_URL,
		telemetry: {
			enabled: false,
		},
		database: drizzleAdapter(db, {
			provider: "pg",
		}),
		plugins: [tanstackStartCookies()],
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60, // 5 minutes
			},
		},
		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
			},
		},
	}),
);

export const auth = getAuthConfig();
export const $getAuth = createServerFn({ method: "GET" }).handler(async () => {
	const { headers, response } = await auth.api.getSession({
		headers: getRequest().headers,
		returnHeaders: true,
	});

	if (!response) {
		return null;
	}

	const cookies = headers.getSetCookie();
	if (cookies.length) {
		setResponseHeader("Set-Cookie", cookies);
	}

	return {
		user: response.user,
		session: response.session,
	};
});
export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await auth.api.getSession({
		headers: getRequest().headers,
		query: {
			disableCookieCache: true,
		},
	});

	if (!session) {
		setResponseStatus(401);
		throw new Error("Unauthorized");
	}

	return next({ context: { user: session.user } });
});
