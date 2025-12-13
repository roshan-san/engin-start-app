import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="flex min-h-screen items-center justify-center gap-2 p-2">
			<Button className="w-fit" size="lg">
				<Link to="/a/dashboard">Go to App</Link>
			</Button>
		</div>
	);
}
