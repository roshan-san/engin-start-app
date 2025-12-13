import { createFileRoute } from "@tanstack/react-router";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/feed/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="flex flex-1 items-center justify-center gap-2">
			Hello "/(authenticated)/a/feed/"!
		</Card>
	);
}
