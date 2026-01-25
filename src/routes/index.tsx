import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { bypassMainFn } from "~/server/functions/bypass-main";

export const Route = createFileRoute("/")({
	component: HomePage,
	beforeLoad: async () => await bypassMainFn(),
});
function HomePage() {
	const router = useRouter();
	return (
		<div className="flex min-h-screen items-center justify-center gap-2 p-2">
			<Button
				variant={"outline"}
				onClick={() => router.navigate({ to: "/app/dashboard" })}
			>
				Go to App
			</Button>
		</div>
	);
}
