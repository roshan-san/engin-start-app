import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/explore/sprints/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/explore/sprints/"!</div>;
}
