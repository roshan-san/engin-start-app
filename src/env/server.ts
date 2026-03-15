import { createEnv } from "@t3-oss/env-core";
import "dotenv/config";
import * as z from "zod";

export const env = createEnv({
	server: {
		BASE_URL: z.url(),
		VITE_BASE_URL: z.url(),

		DATABASE_URL: z.url(),
		BETTER_AUTH_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),

		DODO_PAYMENTS_API_KEY: z.string(),
		DODO_PAYMENTS_WEBHOOK_SECRET: z.string(),
		DODO_ENVIRONMENT: z.enum(["test_mode", "live_mode"]).default("test_mode"),
		DODO_PRO_PLAN_ID: z.string(),
	},
	runtimeEnv: process.env,
});
