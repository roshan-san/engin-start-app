import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { getPlanFn } from "~/features/profile/profile.fn";
import { getMyStartupsFn } from "~/features/startup/startup.fn";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery({
		queryKey: ["my-startups"],
		queryFn: getMyStartupsFn,
	});
	const { data: plan } = useSuspenseQuery({
		queryKey: ["user-plan"],
		queryFn: getPlanFn,
	});
	console.log(data);

	return (
		<div className="flex-1 flex  items-center justify-center gap-6 p-4">
			{plan === "pro" ? (
				<p className="text-lg font-medium">You are in pro plan.</p>
			) : (
				<div>You are in free plan</div>
			)}
			<Button asChild variant={"outline"}>
				<Link to="/app/settings/billing">Manage Subscription</Link>
			</Button>
		</div>
	);
}
