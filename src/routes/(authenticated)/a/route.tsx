import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "~/components/app/Header";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/a")({
	component: DashboardIndex,
	beforeLoad: async ({ context }) => {
		const profile = await context.queryClient.ensureQueryData(
			profileQueryOptions(),
		);
		if (!profile || !profile.onboarding_complete) {
			throw redirect({ to: "/onboard" });
		}
		return { profile };
	},
});

function DashboardIndex() {
	return (
		<div className="flex h-screen w-screen flex-col gap-2 p-2">
			<Header />
			<Outlet />
		</div>
	);
}
