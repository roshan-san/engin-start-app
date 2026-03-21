import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { profileQueryOptions } from "~/features/auth/auth-client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/app/settings/billing/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { data: profile } = useSuspenseQuery(profileQueryOptions());
	return (
		<div className="flex-1 flex flex-col">
			<div className="flex justify-start gap-2 py-2">
				<Button
					variant={"ghost"}
					onClick={() => router.navigate({ to: "/app/settings" })}
				>
					<ArrowLeft />
					<p className="text-xl text-muted-foreground ">Billing</p>
				</Button>
			</div>
			<div className="flex-1 flex  items-center justify-center gap-6 p-4">
				{profile?.user_type === "pro" ? (
					<p className="text-lg font-medium">You are in pro plan.</p>
				) : (
					<div>You are in free plan</div>
				)}
				<Button asChild variant={"outline"}>
					<Link to="/app/settings/billing/pro">Buy Pro</Link>
				</Button>
			</div>
		</div>
	);
}
