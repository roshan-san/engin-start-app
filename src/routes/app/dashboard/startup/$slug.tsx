import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard/startup/$slug")({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	return <div>startup management for slug {slug}</div>;
}
