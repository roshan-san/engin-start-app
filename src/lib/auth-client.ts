import { createAuthClient } from "better-auth/react";
import { queryOptions } from "@tanstack/react-query";
import { env } from "~/env/client";
import { getMyProfile } from "~/server/fn/profiles";
import { getAuth } from "~/server/lib/auth";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [],
});

export const authQueryOptions = () =>
	queryOptions({
		queryKey: ["auth", "session"],
		queryFn: ({ signal }) => getAuth({ signal }),
	});

export const profileQueryOptions = () =>
	queryOptions({
		queryKey: ["profile", "me"],
		queryFn: ({ signal }) => getMyProfile({ signal }),
	});
