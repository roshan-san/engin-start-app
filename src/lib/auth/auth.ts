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
				clientId: env.GOOGLE_CLIENT_ID!,
				clientSecret: env.GOOGLE_CLIENT_SECRET!,
			},
		},
	}),
);

export const auth = getAuthConfig();
