import { createFileRoute } from "@tanstack/react-router";
import { ExploreCard } from "~/components/app/explore/ExploreCard";

export const Route = createFileRoute("/app/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex-1 flex flex-col">
			<div>
				<h1 className="text-xl font-bold p-8">Explore</h1>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 flex-1">
				<ExploreCard
					to="/app/explore/startups"
					title="Explore Startups"
					image="/illustrations/undraw_pitching_y6kw.svg"
				/>
				<ExploreCard
					to="/app/explore/sprints"
					title="Explore Sprints"
					image="/illustrations/undraw_scrum-board_7bgh.svg"
				/>
			</div>
		</div>
	);
}
