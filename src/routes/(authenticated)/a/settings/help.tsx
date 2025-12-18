import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/a/settings/help")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="col-span-9 flex items-center justify-center p-2 gap-2 bg-pink-400">
			<p className="text-4xl">help page</p>
		</div>
	);
}
