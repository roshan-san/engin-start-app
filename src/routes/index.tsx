import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { bypassMainFn } from "~/server/fn/bypass-main";

export const Route = createFileRoute("/")({
	component: HomePage,
	beforeLoad: async () => await bypassMainFn(),
});
function HomePage() {
	return (
		<div className="flex min-h-screen items-center justify-center gap-2 p-2">
			<Button variant={"outline"}>
				<Link to="/a/dashboard">Go to App</Link>
			</Button>
		</div>
	);
}
