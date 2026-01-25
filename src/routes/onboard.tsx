import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { profileQueryOptions } from "~/lib/auth-client";
import OnboardForm from "~/components/login/onboard-forms/OnboardForm";

export const Route = createFileRoute("/onboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { data: profile } = useSuspenseQuery(profileQueryOptions());
	if (profile?.onboarding_complete) {
		router.navigate({ to: "/app/dashboard" });
	}
	return (
		<div className="grid min-h-screen grid-cols-2 gap-2 p-4">
			<div className="flex items-center p-4 justify-center">
				<img
					className="w-100"
					src="/illustrations/undraw_all-the-data_ijgn.svg"
					alt=""
				/>
			</div>
			<div className="flex items-center justify-center">
				<OnboardForm />
			</div>
		</div>
	);
}
