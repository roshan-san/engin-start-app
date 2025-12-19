import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/(authenticated)/a/settings/billing")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex-1 bg-card rounded-xl">
			<Card className="h-full border-0 shadow-none">
				<CardHeader>
					<CardTitle>Subscription</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<div className="flex items-center justify-between border-b pb-3">
						<div>
							<p className="text-base font-medium">Plan</p>
							<p className="text-muted-foreground text-base">Basic</p>
						</div>
						<Button variant="outline" size="sm">
							Upgrade
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
