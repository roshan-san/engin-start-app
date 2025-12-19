import { Link, useLocation } from "@tanstack/react-router";
import { Bell, GitPullRequestArrowIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { AppAvatar } from "./AppAvatar";
import NavigationMenu from "./NavigationMenu";

export default function Header() {
	const { pathname } = useLocation();
	const isActive = (path: string) => pathname.startsWith(path);
	return (
		<div className="flex w-full items-center justify-between rounded-xl">
			<div className="flex items-center justify-center gap-2">
				<GitPullRequestArrowIcon className="h-5 w-5" />
				<p className="text-xl font-bold tracking-tight">ENGIN</p>
			</div>
			<NavigationMenu />
			<div className="flex items-center justify-center gap-2">
				<Link
					to="/a/notifications"
					className={cn(
						"text-muted-foreground flex items-center justify-center gap-2 p-2 text-base transition-all",
						"hover:text-foreground",
						isActive("/a/notifications") &&
							"text-foreground border-accent border-b-2",
					)}
				>
					<Bell className="h-4 w-4" />
				</Link>
				<ThemeToggle />
				<AppAvatar />
			</div>
		</div>
	);
}
