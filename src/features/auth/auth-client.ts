import { createAuthClient } from "better-auth/react";
import { queryOptions } from "@tanstack/react-query";
import { env } from "~/env/client";
import { getMyProfileFn } from "~/features/profile/profile.fn";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [],
});

export const profileQueryOptions = () =>
	queryOptions({
		queryKey: ["profile", "me"],
		queryFn: ({ signal }) => getMyProfileFn({ signal }),
	});

export type ProfileType = Awaited<ReturnType<typeof getMyProfileFn>>;
