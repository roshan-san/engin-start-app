import { Link, useLocation } from "@tanstack/react-router";
import { CompassIcon, LayoutDashboardIcon, SearchIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export default function NavigationMenu() {
	const { pathname } = useLocation();

	const isActive = (path: string) => pathname.startsWith(path);

	const nav = [
		{ name: "Dashboard", path: "/a/dashboard", icon: LayoutDashboardIcon },
		{ name: "Feed", path: "/a/feed", icon: CompassIcon },
		{ name: "Explore", path: "/a/explore", icon: SearchIcon },
	];

	return (
		<div className="items-center hidden md:flex justify-center gap-2">
			{nav.map((item) => {
				const Icon = item.icon;
				const active = isActive(item.path);

				return (
					<Link
						key={item.path}
						to={item.path}
						className={cn(
							"text-muted-foreground flex items-center gap-2 px-4 py-2 text-sm transition-all",
							"hover:-translate-y-1 duration-300",
							active && "border-primary text-primary border-b-2",
						)}
					>
						<Icon className={cn("h-4 w-4 transition-colors")} />
						{item.name}
					</Link>
				);
			})}
		</div>
	);
}
