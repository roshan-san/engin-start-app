import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { bypassMainFn } from "~/server/fn/bypass-main";
import { authQueryOptions, profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/")({
	component: HomePage,
	beforeLoad: async ({ context }) => {
		await context.queryClient.prefetchQuery(profileQueryOptions());
		await context.queryClient.prefetchQuery(authQueryOptions());
		const { admin } = await bypassMainFn();
		console.log("Bypass Main Admin:", admin);
		if (!admin) {
			throw redirect({ to: "/maintenance" });
		}
	},
});
function HomePage() {
	return (
		<div className="flex min-h-screen items-center justify-center gap-2 p-2">
			<div>landing page goes in here</div>
			<Button className="w-fit" size="lg">
				<Link to="/a/dashboard">Go to App</Link>
			</Button>
		</div>
	);
}
