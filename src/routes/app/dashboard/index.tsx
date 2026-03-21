import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
		</div>
	);
}
