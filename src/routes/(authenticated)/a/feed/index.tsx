import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/a/feed/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile } = Route.useRouteContext();
	return (
		<div className="bg-card rounded-xl flex-1 flex items-center justify-center p-2 gap-2">
			<div className="text-center"> Feed </div>
		</div>
	);
}
