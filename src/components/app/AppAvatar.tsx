import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { HelpCircle, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
	const fullName =
		profile.full_name.charAt(0).toUpperCase() + profile.full_name.slice(1);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="rounded-xl">
					<AvatarImage
						alt={profile.full_name}
						src={profile.avatar_url || undefined}
					/>
					<AvatarFallback>
						{profile.full_name.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="p-2 w-auto border-0">
				<DropdownMenuLabel>
					<div className="flex flex-col gap-2">
						<p className="text-sm">{`Hey ${fullName} !`}</p>
						<p className="text-muted-foreground text-xs">{profile.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link className="flex items-center gap-2" to="/a/settings/profile">
						<Settings />
						<p>Settings</p>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link to="/a/dashboard" className="flex items-center gap-2">
						<HelpCircle />
						<p>Help</p>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant="destructive"
					className="flex items-center gap-2"
					onClick={async () => {
						await authClient.signOut({
							fetchOptions: {
								onResponse: async () => {
									queryClient.setQueryData(authQueryOptions().queryKey, null);
									await router.invalidate();
								},
								onSuccess: async () => {
									toast.warning("Signing out...");
								},
								onError: async () => {
									toast.error("Failed to Sign Out");
								},
							},
						});
					}}
				>
					<LogOut />
					<p>Logout</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
