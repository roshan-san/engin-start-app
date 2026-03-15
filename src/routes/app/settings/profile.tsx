import { EditProfileSchema } from "~/components/app/settings/edit-profile";
import { Button } from "~/components/ui/button";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { updateProfileFn } from "~/server/functions/profiles";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { profileQueryOptions } from "~/lib/auth-client";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";

export const Route = createFileRoute("/app/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { qc } = Route.useRouteContext();
	const router = useRouter();
	const { data: profile } = useSuspenseQuery(profileQueryOptions());
	if (profile === null) {
		throw redirect({ to: "/join" });
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(EditProfileSchema),
	});
	const { mutate, isPending } = useMutation({
		mutationFn: updateProfileFn,
		onSuccess: async () => {
			qc.invalidateQueries(profileQueryOptions());
			toast.success("Profile updated successfully");
		},
		onError: () => {
			toast.error("Error occurred while updating");
		},
	});

	return (
		<div className="flex-1 flex-col flex">
			<div className="flex justify-start gap-2 py-2">
				<Button
					variant={"ghost"}
					onClick={() => router.navigate({ to: "/app/settings" })}
				>
					<ArrowLeft />
					<p className="text-xl text-muted-foreground ">Profile Settings</p>
				</Button>
			</div>
			<div className="flex-1 flex gap-2 ">
				<div className="md:flex items-center hidden justify-center w-1/2">
					some illustration
				</div>
				<form
					className="flex md:w-1/2 w-full flex-col justify-between rounded-xl gap-4 p-4"
					id="edit-profile-form"
					onSubmit={handleSubmit((data) =>
						mutate({
							data: data,
						}),
					)}
				>
					<div>
						<Field data-invalid={!!errors}>
							<FieldLabel htmlFor="username">Full Name</FieldLabel>
							<Input id="username" {...register("full_name")} />
							<FieldError>{errors.full_name?.message}</FieldError>
						</Field>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex flex-col cursor-not-allowed justify-between gap-2 hover:">
									<Label className="text-base" htmlFor="username">
										Username
									</Label>
									<Input
										className="w-full max-w-md"
										id="username"
										value={profile.username}
										disabled={true}
									/>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-base">Username Cannot be Changed</p>
							</TooltipContent>
						</Tooltip>
					</div>

					<div className="flex justify-end">
						<Button
							className="text-base font-bold p-4"
							type="submit"
							form="edit-profile-form"
						>
							{isPending ? <Spinner /> : null}
							{isPending ? "Updating" : "Update Profile"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
