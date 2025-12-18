import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen items-center justify-center gap-2 p-2">
			<div className="bg-red-500 w-50 h-50 "></div>
			<div className="bg-pink-500 w-50 h-50"> </div>
		</div>
	);
}
