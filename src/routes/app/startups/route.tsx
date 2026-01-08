import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/startups")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Startup Route</div>;
}
