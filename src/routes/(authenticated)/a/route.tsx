import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomBar } from "~/components/app/BottomBar";
import Header from "~/components/app/Header";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/a")({
	component: AppLayout,
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

function AppLayout() {
	return (
		<div className=" min-h-screen flex flex-col p-2 gap-2">
			<Header />
			<Outlet />
			<BottomBar />
		</div>
	);
}
