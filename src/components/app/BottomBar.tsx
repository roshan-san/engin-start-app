import { Link, useLocation } from "@tanstack/react-router";
import { CompassIcon, LayoutDashboardIcon, SearchIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export function BottomBar() {
	const { pathname } = useLocation();

	const isActive = (path: string) => pathname.startsWith(path);

	const nav = [
		{ name: "Dashboard", path: "/a/dashboard", icon: LayoutDashboardIcon },
		{ name: "Feed", path: "/a/feed", icon: CompassIcon },
		{ name: "Explore", path: "/a/explore", icon: SearchIcon },
	];

	return (
		<div className="flex items-center justify-around gap-2 rounded-xl bg-card p-2 sm:hidden">
			{nav.map(({ name, icon: Icon, path }) => {
				const active = isActive(path);

				return (
					<Link key={name} to={path} className="flex-1">
						<div
							className={cn(
								"flex items-center justify-center gap-2 p-2 transition-all duration-300",
								active
									? "text-foreground border-t-2 border-accent"
									: "text-muted-foreground ",
							)}
						>
							<Icon className="h-5 w-5 " />
							<p className="text-base">{name}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
