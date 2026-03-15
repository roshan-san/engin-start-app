import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { StartupCard } from "~/components/app/dashboard/StartupCard";
import { Button } from "~/components/ui/button";
import { getMyStartupsFn } from "~/server/functions/startups";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery({
		queryKey: ["my-startups"],
		queryFn: getMyStartupsFn,
	});
	console.log(data);

	return (
		<div className="flex-1 grid grid-cols-2 items-center justify-center gap-6 p-4">
			{data.map((startup) => (
				<StartupCard
					key={startup.id}
					cin={startup.cin}
					name={startup.name}
					description={startup.description}
					created_at={startup.created_at}
					updated_at={startup.updated_at}
				/>
			))}
			<Link
				className="absolute z-50 bottom-12 right-12"
				to="/app/dashboard/startup/new"
			>
				<Button className="flex items-center justify-center">
					<Plus />
					<p className="text-base font-bold">Add Your Startup</p>
				</Button>
			</Link>
		</div>
	);
}
