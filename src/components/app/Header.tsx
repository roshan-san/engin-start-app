import { Link } from "@tanstack/react-router";
import { Bell, GitPullRequestArrowIcon } from "lucide-react";
import { AppAvatar } from "./AppAvatar";
import NavigationMenu from "./Navigation";
import { cn } from "~/lib/utils";

export function Header() {
	return (
		<div className="flex items-center justify-between px-4">
			<div className="flex items-center gap-2">
				<GitPullRequestArrowIcon className="h-5 w-5" />
				<span className="font-bold text-xl">ENGIN</span>
			</div>
			<NavigationMenu />
			<div className="flex items-center gap-2">
				<Link
					to="/a/notifications"
					className={cn(
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
