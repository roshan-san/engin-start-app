import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-8">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</div>
		</div>
	);
}
