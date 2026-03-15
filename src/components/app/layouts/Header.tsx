import { Link, useLocation } from "@tanstack/react-router";
import { Bell, GitPullRequestArrowIcon } from "lucide-react";
import { AppAvatar } from "./AppAvatar";
import NavigationMenu from "./Navigation";
import { cn } from "~/lib/utils";

export function Header() {
	const { pathname } = useLocation();
	const isNotifs = pathname === "/app/notifications";
	return (
		<div className="flex items-center justify-between px-4">
			<Link to="/" className="flex items-center  gap-2">
				<GitPullRequestArrowIcon className="h-5 text-primary w-5" />
				<span className="font-bold text-xl">ENGIN</span>
			</Link>
			<NavigationMenu />
			<div className="flex items-center gap-2">
				<Link
					to="/app/notifications"
					className={cn(
						isNotifs && "border-b-2 border-primary",
						"text-muted-foreground p-2",
						"transition-all duration-300 ease-in-out",
						"hover:text-foreground hover:-translate-y-1",
					)}
				>
					<Bell className="h-5 w-5" />
				</Link>
				<AppAvatar />
			</div>
		</div>
	);
}
