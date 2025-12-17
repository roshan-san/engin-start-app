import { createFileRoute } from "@tanstack/react-router";
import { Card } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/notifications/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile } = Route.useRouteContext();
	return (
		<div className="bg-card rounded-xl flex-1 flex items-center justify-center p-2 gap-2">
			<div className="text-center">notifs</div>
		</div>
	);
}
