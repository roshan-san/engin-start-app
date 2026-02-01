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
		<div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 ">
			<div className="max-w-2xl w-full text-center">
				<h1 className="text-4xl font-bold mb-8">The Fast Lane For Founders</h1>
				<div className="flex flex-col sm:flex-row justify-center gap-4">
					<Button
						variant={"ghost"}
						onClick={() => router.navigate({ to: "/app/dashboard" })}
					>
						Go to App
					</Button>
				</div>
			</div>
		</div>
	);
}
