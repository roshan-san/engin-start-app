import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/app/explore/")({
	component: RouteComponent,
});
const items = [
	{
		title: "Explore Startups",
		image: "/illustrations/undraw_pitching_y6kw.svg",
		to: "/app/explore/startups",
	},
	{
		title: "Explore Sprints",
		image: "/illustrations/undraw_scrum-board_7bgh.svg",
		to: "/app/explore/sprints",
	},
];

function RouteComponent() {
	return (
		<div className="flex flex-col md:flex-row items-center justify-around p-6 flex-1">
			{items.map((item) => (
				<Link
					key={item.to}
					to={item.to}
					className="group w-full max-w-md h-80 rounded-2xl bg-card hover:border 
					flex flex-col items-center justify-center gap-6
					transition-all duration-300 ease-out
					hover:-translate-y-2 hover:shadow-xl hover:border-primary"
				>
					<img
						src={item.image}
						alt={item.title}
						className="w-xs transition-transform duration-300 group-hover:scale-105"
					/>
					<p className="text-xl font-medium">{item.title}</p>
				</Link>
			))}
		</div>
	);
}
