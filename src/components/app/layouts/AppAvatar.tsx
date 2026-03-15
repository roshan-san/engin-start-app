import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { LogOut, Settings } from "lucide-react";
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
import { authClient, profileQueryOptions } from "~/lib/auth-client";

export function AppAvatar() {
	const { qc } = useRouteContext({
		from: "/app",
	});
	const router = useRouter();

	const { data: profile } = useSuspenseQuery(profileQueryOptions());
	if (!profile) {
		return null;
	}
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
			<DropdownMenuContent
				align="end"
				className="p-2 rounded-xl w-auto border-0"
			>
				<DropdownMenuLabel>
					<div className="flex flex-col gap-2">
						<p className="text-base">{`Hey ${fullName} !`}</p>
						<p className="text-muted-foreground text-base">{profile.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link className="flex items-center gap-2" to="/app/settings">
						<Settings />
						<p>Settings</p>
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
									qc.invalidateQueries(profileQueryOptions());
									await router.navigate({ to: "/login" });
								},
								onSuccess: async () => {
									toast.info("Signing out...");
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
