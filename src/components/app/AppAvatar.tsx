import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { HelpCircle, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import authClient from "~/lib/auth/auth-client";
import { authQueryOptions } from "~/lib/auth/queries";

export function AppAvatar() {
	const { profile, queryClient } = useRouteContext({
		from: "/(authenticated)/a",
	});
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="relative h-10 w-10 rounded-full" variant="ghost">
					<Avatar>
						<AvatarImage
							alt={profile.full_name}
							src={profile.avatar_url || undefined}
						/>
						<AvatarFallback>{profile.full_name.charAt(0)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="py-2">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm">{profile.full_name}</p>
						<p className="text-muted-foreground text-xs">{profile.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link
						className="flex w-full items-center gap-2"
						to="/a/settings/profile"
					>
						<Settings />
						Settings
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<HelpCircle />
					Help
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={async () => {
						toast.warning("Signing out...");
						await authClient.signOut({
							fetchOptions: {
								onResponse: async () => {
									// manually set to null to avoid unnecessary refetching
									queryClient.setQueryData(authQueryOptions().queryKey, null);
									await router.invalidate();
								},
							},
						});
					}}
					className="w-full"
					variant="destructive"
				>
					<LogOut />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
