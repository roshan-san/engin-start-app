import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "~/components/app/Header";
import { BottomBar } from "~/components/app/Navigation";
import { profileQueryOptions } from "~/auth/auth-client";

export const Route = createFileRoute("/app")({
	component: AppLayout,
	beforeLoad: async ({ context }) => {
		const profile = await context.qc.ensureQueryData(profileQueryOptions());
		if (!profile || !profile.onboarding_complete) {
			throw redirect({ to: "/onboard" });
		}
		return { profile };
	},
});

function AppLayout() {
	return (
		<div className="min-h-screen flex flex-col p-2 gap-2">
			<Header />
			<div className="flex-1 flex flex-col gap-2">
				<Outlet />
			</div>
			<BottomBar />
		</div>
	);
}
