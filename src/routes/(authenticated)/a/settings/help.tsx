import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(authenticated)/a/settings/help")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	return (
		<div className="flex-1 flex flex-col rounded-xl">
			<div className="flex justify-start gap-2 p-2">
				<Button
					variant={"ghost"}
					onClick={() => router.navigate({ to: "/a/settings" })}
				>
					<ArrowLeftIcon />
					<p className="text-xl text-muted-foreground ">Help</p>
				</Button>
			</div>
			<div className="flex flex-1 flex-col items-center justify-center p-2 gap-2">
				<p className="text-muted-foreground">empty help page</p>
			</div>
		</div>
	);
}
