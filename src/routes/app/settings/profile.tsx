import { Button } from "~/components/ui/button";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, LockIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { profileQueryOptions } from "~/features/auth/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { updateProfileFn } from "~/features/profile/profile.fn";
import z from "zod";

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
	const ProfileSchema = z.object({
		full_name: z
			.string()
			.trim()
			.min(4, "Full name must be at least 4 characters")
			.max(100, "Full name is too long")
			.regex(
				/^[A-Za-z]+(?: [A-Za-z]+)*$/,
				"Full name can only contain letters and single spaces, and must start with a letter",
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			full_name: profile.full_name ?? undefined,
		},
		resolver: zodResolver(ProfileSchema),
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
					<img
						className="w-full max-w-md"
						src="/illustrations/undraw_personal-information_h7kf.svg"
						alt="Profile Illustration"
					/>
				</div>
				<form
					className="flex bg-card/30 md:w-1/2 w-full flex-col justify-between rounded-xl gap-4 p-2"
					id="edit-profile-form"
					onSubmit={handleSubmit((data) =>
						mutate({
							data: data,
						}),
					)}
				>
					<div className="flex md:flex-row flex-col gap-6 items-center justify-center p-2">
						<Field className="cursor-not-allowed">
							<Label className="text-base" htmlFor="username">
								Username
								<LockIcon className="w-4 h-4" />
							</Label>
							<Input
								className="w-full max-w-md"
								id="username"
								value={profile.username}
								disabled={true}
							/>
						</Field>
						<Field data-invalid={!errors}>
							<FieldLabel htmlFor="full_name">Full Name</FieldLabel>
							<Input
								className="w-full max-w-md"
								id="full_name"
								{...register("full_name")}
							/>
							<FieldError>{errors.full_name?.message}</FieldError>
						</Field>
					</div>

					<div className="flex justify-end">
						<Button
							className="text-base  p-4"
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
