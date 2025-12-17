import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/a/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-card rounded-xl flex-1 flex items-center justify-center p-2 gap-2">
			<div className="text-center">Dashboard ding page</div>
		</div>
	);
}
