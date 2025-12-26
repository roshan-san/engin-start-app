import { queryOptions } from "@tanstack/react-query";
import { $getProfile } from "~/fn/profiles.fn";
import { $getUser } from "./functions";

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

export type AuthQueryResult = Awaited<ReturnType<typeof $getUser>>;
export type ProfileQueryResult = Awaited<ReturnType<typeof $getProfile>>;
