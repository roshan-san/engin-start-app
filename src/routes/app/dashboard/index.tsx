import { createFileRoute } from "@tanstack/react-router";
import { ExploreCard } from "~/components/app/explore/ExploreCard";

export const Route = createFileRoute("/app/dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex-1 flex md:flex-row items-center justify-center flex-col gap-6 p-4">
			<ExploreCard title={""} image={""} />
			<ExploreCard title={""} image={""} />
		</div>
	);
}
