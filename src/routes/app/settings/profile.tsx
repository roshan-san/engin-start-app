import type { EditProfileSchema } from "~/components/form/settings-forms/edit-profile";
import { EditProfileOps } from "~/components/form/settings-forms/edit-profile";
import { Button } from "~/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/AppForm";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "~/server/fn/profiles";
import type z from "zod";
import { FieldGroup } from "~/components/ui/field";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { profileQueryOptions } from "~/auth/auth-client";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export const Route = createFileRoute("/app/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile, qc } = Route.useRouteContext();
	const defaultValues: z.infer<typeof EditProfileSchema> = {
		full_name: profile.full_name,
	};
	const router = useRouter();
	const form = useAppForm({
		defaultValues,
		...EditProfileOps,
		onSubmit: () => mutate(),
	});
	const { mutate, isPending } = useMutation({
		mutationFn: () =>
			updateProfileFn({
				data: {
					full_name: form.getFieldValue("full_name"),
				},
			}),
		onSuccess: async () => {
			qc.invalidateQueries(profileQueryOptions());
			await router.invalidate();
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
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<form.AppField name="full_name">
							{(field) => <field.TextInput id="Name" label="Name" />}
						</form.AppField>
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
					</FieldGroup>

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
