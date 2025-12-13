import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/(authenticated)/a/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile } = Route.useRouteContext();
	return (
		<Card className="col-span-9">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="space-y-2">
					<Label htmlFor="full-name">Full Name</Label>
					<Input placeholder={profile.full_name} id="full-name" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="username">Username</Label>
					<Input id="username" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="bio">Bio</Label>
					<Input id="bio" />
				</div>
				<div className="flex justify-end gap-2 pt-2">
					<Button>Save</Button>
				</div>
			</CardContent>
		</Card>
	);
}
