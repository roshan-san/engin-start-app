import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { profileQueryOptions } from "~/features/auth/auth-client";
import OnboardForm from "~/features/profile/comp/OnboardForm";

export const Route = createFileRoute("/join")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { data: profile } = useSuspenseQuery(profileQueryOptions());

	if (profile?.onboarding_complete) {
		router.navigate({ to: "/app/dashboard" });
	}
	return (
		<div className="flex min-h-screen gap-2 p-6">
			<img
				className="w-full md:w-1/3"
				src="/illustrations/undraw_all-the-data_ijgn.svg"
				alt=""
			/>
			<OnboardForm />
		</div>
	);
}
