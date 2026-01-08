import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { startupQueryOptions } from "~/queries/startups";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { data } = useSuspenseQuery(startupQueryOptions);
	return (
		<div className="rounded-xl flex-1 flex items-center justify-center p-2 gap-2">
			<Link
				className="bg-card w-full h-120 rounded-xl flex items-center max-w-md text-center justify-center"
				to="/app/dashboard/startup/$slug"
				params={{ slug: "zomato" }}
			>
				<p className="text-xl font-bold">Zomato</p>
			</Link>
			<Link
				className="bg-card w-full h-120 rounded-xl flex items-center max-w-md text-center justify-center"
				to="/app/dashboard/startup/$slug"
				params={{ slug: "swiggy" }}
			>
				<p className="text-xl font-bold">Swiggy</p>
			</Link>
			<Button
				variant={"default"}
				className="absolute z-50 bottom-20 right-20"
				onClick={() => router.navigate({ to: "/app/dashboard/startup/new" })}
			>
				<Plus />
				List Your Startup
			</Button>
		</div>
	);
}
