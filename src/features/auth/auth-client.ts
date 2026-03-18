import { createAuthClient } from "better-auth/react";
import { queryOptions } from "@tanstack/react-query";
import { env } from "~/env/client";
import { getMyProfile } from "~/features/profile/profile.fn";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [],
});

export const profileQueryOptions = () =>
	queryOptions({
		queryKey: ["profile", "me"],
		queryFn: ({ signal }) => getMyProfile({ signal }),
	});

export type ProfileType = Awaited<ReturnType<typeof getMyProfile>>;
