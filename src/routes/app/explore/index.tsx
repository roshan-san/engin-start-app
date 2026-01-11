import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/app/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="grid grid-cols-2 gap-6 p-6 flex-1">
			<Link
				to="/app/explore/startups"
				className="bg-card flex flex-col hover:scale-90 hover:text-primary items-center justify-center rounded-2xl "
			>
				<img
					className="w-100 "
					src="/illustrations/undraw_pitching_y6kw.svg"
					alt=""
				/>
				<p className="text-xl font-bold "> Explore Startups</p>
			</Link>
			<Link
				to="/app/explore/startups"
				className="bg-card flex flex-col  hover:scale-90 hover:text-primary items-center justify-center rounded-2xl "
			>
				<img
					className="w-100"
					src="/illustrations/undraw_scrum-board_7bgh.svg"
					alt=""
				/>
				<p className="text-xl font-bold"> Explore Sprints</p>
			</Link>
		</div>
	);
}
