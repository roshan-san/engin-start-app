import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { authQueryOptions, profileQueryOptions } from "~/lib/auth/auth-client";
import { bypassMainFn } from "~/server/fn/bypass-main";

export const Route = createFileRoute("/")({
	component: HomePage,
	beforeLoad: async ({ context }) => {
		await context.queryClient.prefetchQuery(profileQueryOptions());
		await context.queryClient.prefetchQuery(authQueryOptions());
		const { admin } = await bypassMainFn();
		if (!admin) {
			throw redirect({ to: "/maintenance" });
		}
	},
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
