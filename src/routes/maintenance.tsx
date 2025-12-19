import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maintenance")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
			<h1 className="text-2xl font-bold underline">Maintenance Mode</h1>
			<p className="mt-4">
				Our site is currently undergoing scheduled maintenance. We apologize for
				any inconvenience and appreciate your patience. Please check back later.
			</p>
		</div>
	);
}
