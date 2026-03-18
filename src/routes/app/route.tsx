import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	Outlet,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import { Header } from "~/components/layouts/Header";
import { BottomBar } from "~/components/layouts/Navigation";
import { GlobalSpinner } from "~/components/globals/GlobalSpinner";
import { profileQueryOptions } from "~/features/auth/auth-client";
import { bypassMainFn } from "~/features/auth/bypass-main";

export const Route = createFileRoute("/app")({
	component: AppLayout,
	pendingComponent: GlobalSpinner,
	beforeLoad: async ({ context }) => {
		const allowed = await bypassMainFn();
		if (!allowed) {
			throw redirect({ to: "/wait" });
		}
		const profile = await context.qc.ensureQueryData(profileQueryOptions());
		if (profile === null) {
			throw redirect({ to: "/join" });
		}
	},
});

function AppLayout() {
	const router = useRouter();
	const { data: profile } = useSuspenseQuery(profileQueryOptions());

	if (!profile || !profile.onboarding_complete) {
		router.navigate({ to: "/join" });
	}
	return (
		<div className="min-h-screen w-screen ring flex flex-col p-2 gap-2">
			<Header />
			<Outlet />
			<BottomBar />
		</div>
	);
}
