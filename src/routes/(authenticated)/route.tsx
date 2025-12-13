import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)")({
	component: Outlet,
	beforeLoad: async ({ context }) => {
		const auth = await context.queryClient.ensureQueryData(authQueryOptions());
		if (!auth) {
			throw redirect({
				to: "/login",
			});
		}
		return { auth: auth };
	},
});
