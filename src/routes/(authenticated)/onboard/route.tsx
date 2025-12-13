import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/onboard")({
	component: RouteComponent,
	beforeLoad: async ({ context, location }) => {
		const profile = await context.queryClient.ensureQueryData(
			profileQueryOptions(),
		);

		const path = location.pathname;

		let nextStep: string | null = null;
		if (!profile) {
			nextStep = "/onboard/name";
		} else if (profile.onboarding_complete) {
			nextStep = "/a/dashboard";
		} else if (!profile.full_name) {
			nextStep = "/onboard/name";
		} else if (!profile.user_type) {
			nextStep = "/onboard/user-type";
		} else if (!profile.state) {
			nextStep = "/onboard/location";
		}

		if (nextStep && path !== nextStep) {
			throw redirect({ to: nextStep });
		}
		console.log(profile, path);
	},
});

function RouteComponent() {
	return (
		<div className="grid min-h-screen grid-cols-12 gap-2 p-2">
			<div className="col-span-6 flex items-center justify-center bg-yellow-500">
				<p className="text-2xl font-bold">Some Illustration</p>
			</div>
			<Outlet />
		</div>
	);
}
