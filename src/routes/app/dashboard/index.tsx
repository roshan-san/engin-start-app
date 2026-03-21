import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { profileQueryOptions } from "~/features/auth/auth-client";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: profile } = useSuspenseQuery(profileQueryOptions());

	return (
		<div className="flex-1 flex  items-center justify-center gap-6 p-4">
			{profile?.plan === "pro" ? (
				<p className="text-lg font-medium">You are in pro plan.</p>
			) : (
				<div>You are in free plan</div>
			)}
			<Button asChild variant={"outline"}>
				<Link to="/app/pro">Buy Pro</Link>
			</Button>
		</div>
	);
}
