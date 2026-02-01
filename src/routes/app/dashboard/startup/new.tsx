import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard/startup/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>New Startup Page</div>;
}
