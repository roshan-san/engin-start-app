import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/startups/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/startup/create"!</div>;
}
