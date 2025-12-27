import { createAuthClient } from "better-auth/react";
import { env } from "~/env/client";

const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
});
import { queryOptions } from "@tanstack/react-query";
import { $getAuth } from "~/server/auth";
import { getMyProfile } from "~/server/fn/profiles.fn";

export const authQueryOptions = () =>
	queryOptions({
		queryKey: ["auth"],
		queryFn: ({ signal }) => $getAuth({ signal }),
	});

export const profileQueryOptions = () =>
	queryOptions({
		queryKey: ["profile"],
		queryFn: ({ signal }) => getMyProfile({ signal }),
	});

export default authClient;
