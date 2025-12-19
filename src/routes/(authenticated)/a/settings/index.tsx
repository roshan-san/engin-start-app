import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { BadgeQuestionMark, CreditCard, User } from "lucide-react";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/(authenticated)/a/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = useLocation();
	const isActive = (path: string) => pathname.startsWith(path);

	const nav = [
		{ name: "Profile", path: "/a/settings/profile", icon: User },
		{ name: "Billing", path: "/a/settings/billing", icon: CreditCard },
		{ name: "Help", path: "/a/settings/help", icon: BadgeQuestionMark },
	];

	return (
		<div className="flex-1 flex w-full justify-center">
			<div className="w-full max-w-md flex flex-col gap-3">
				<p className="text-base text-muted-foreground">Settings</p>

				<div className="flex flex-col gap-1.5">
					{nav.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);

						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"flex items-center justify-between rounded-lg px-3 py-2.5 bg-card transition-colors",
									"hover:bg-accent hover:text-accent-foreground",
									active && "bg-primary text-primary-foreground",
								)}
							>
								<span className="flex items-center gap-2">
									<Icon className="h-4 w-4" />
									<span className="font-medium text-base">{item.name}</span>
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
