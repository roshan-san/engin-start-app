import { createFileRoute } from "@tanstack/react-router";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="flex flex-1 items-center justify-center">
			to explore teh pitches of other startups , limited view for basic users
		</Card>
	);
}
