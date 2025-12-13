import { createFileRoute } from "@tanstack/react-router";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/notifications/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="flex flex-1 items-center justify-center">
			here all teh notifications will be shown
		</Card>
	);
}
