import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboardIcon, SearchIcon, type LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type NavItemConfig = {
	name: string;
	path: string;
	icon: LucideIcon;
};

const NAV: NavItemConfig[] = [
	{ name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboardIcon },
	{ name: "Explore Startups", path: "/app/explore", icon: SearchIcon },
];

function isActive(pathname: string, path: string): boolean {
	return pathname === path || pathname.startsWith(`${path}/`);
}

function NavItem({ name, path, icon: Icon }: NavItemConfig) {
	const { pathname } = useLocation();
	const active = isActive(pathname, path);

	return (
		<Link
			to={path}
			className={cn(
				"flex items-center gap-2 px-4 py-2",
				"text-base text-muted-foreground md:border-b-2 md:border-t-0 border-t-2 border-transparent",
				"transition-colors ease-in-out duration-300",
				"hover:text-foreground hover:-translate-y-1",
				active && "text-foreground border-primary",
			)}
		>
			<Icon className="h-5 w-5" />
			{name}
		</Link>
	);
}

export default function NavigationMenu() {
	return (
		<nav className="hidden md:flex">
			{NAV.map((item) => (
				<NavItem key={item.path} {...item} />
			))}
		</nav>
	);
}

export function BottomBar() {
	return (
		<nav className="md:hidden">
			<div className="flex items-center justify-around">
				{NAV.map((item) => (
					<NavItem key={item.path} {...item} />
				))}
			</div>
		</nav>
	);
}
