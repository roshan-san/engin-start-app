import { queryOptions } from "@tanstack/react-query";
import { getMyStartupsFn } from "~/server/fn/startups";

export const startupQueryOptions = queryOptions({
	queryKey: ["startups", "me"],
	queryFn: async () => await getMyStartupsFn(),
});
