import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CreateStartup } from "~/components/app/dashboard/CreateStartup";
import { StartupCard } from "~/components/app/dashboard/StartupCard";
import { getMyStartupsFn } from "~/server/functions/startups";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery({
		queryKey: ["my-startups"],
		queryFn: getMyStartupsFn,
	});

	return (
		<div className="flex-1 grid grid-cols-2 items-center justify-center gap-6 p-4">
			{data.map((startup) => (
				<StartupCard key={startup.id} {...startup} />
			))}
			<CreateStartup />
		</div>
	);
}
