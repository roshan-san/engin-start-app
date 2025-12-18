import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { CreditCard, User } from "lucide-react";
import { CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/(authenticated)/a/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = useLocation();
	const isActive = (path: string) => pathname.startsWith(path);

	const nav = [
		{ name: "Profile", path: "/a/settings/profile", icon: User },
		{ name: "Billing", path: "/a/settings/billing", icon: CreditCard },
	];

	return (
		<div className="grid flex-1 grid-cols-12 gap-2">
			<div className="col-span-3">
				<div>
					<CardTitle>Settings</CardTitle>
				</div>
				<div className="flex flex-col">
					{nav.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);

						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"text-muted-foreground flex items-center gap-2 p-2 text-sm transition-colors",
									"hover:text-foreground",
									active &&
										"border-accent text-primary border-l-2 font-semibold",
								)}
							>
								<Icon className="h-4 w-4" />
								{item.name}
							</Link>
						);
					})}
				</div>
			</div>
			<Outlet />
		</div>
	);
}
