import { createAuthClient } from "better-auth/react";
import { env } from "~/env/client";

const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
});
import { queryOptions } from "@tanstack/react-query";
import { $getProfile } from "~/server/fn/profiles.fn";
import { $getUser } from "../../server/functions";

export const authQueryOptions = () =>
	queryOptions({
		queryKey: ["auth"],
		queryFn: ({ signal }) => $getUser({ signal }),
	});

export const profileQueryOptions = () =>
	queryOptions({
		queryKey: ["profile"],
		queryFn: ({ signal }) => $getProfile({ signal }),
	});

export default authClient;
