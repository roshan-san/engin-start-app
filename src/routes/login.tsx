import { createFileRoute } from "@tanstack/react-router";
import { GoogleButton } from "~/components/login/GoogleButton";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen flex justify-center items-center p-2 gap-2">
			<GoogleButton />
		</div>
	);
}
