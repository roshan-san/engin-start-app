import {
	EditProfileOps,
	type EditProfileSchema,
} from "~/components/form/settings-forms/edit-profile";
import { Button } from "~/components/ui/button";
import {
	createFileRoute,
	useRouteContext,
	useRouter,
} from "@tanstack/react-router";
import { useAppForm } from "~/components/form/AppForm";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "~/functions/profiles.fn";
import type z from "zod";
import { Field, FieldGroup } from "~/components/ui/field";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "~/components/ui/spinner";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/a/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile, queryClient } = Route.useRouteContext();
	const defaultValues: z.infer<typeof EditProfileSchema> = {
		full_name: profile.full_name,
	};
	const router = useRouter();
	const form = useAppForm({
		defaultValues,
		...EditProfileOps,
		onSubmit: async () => mutate(),
	});
	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			return await updateProfileFn({
				data: {
					full_name: form.getFieldValue("full_name"),
				},
			});
		},
		onSuccess: async () => {
			toast.success("Profile Updated Succesfully");
			await queryClient.refetchQueries(profileQueryOptions());
		},
		onError: async () => {
			toast.success("Error Occured While Updating");
		},
	});
	return (
		<div className="flex-1">
			<div className="flex justify-start gap-2 p-2">
				<Button
					variant={"ghost"}
					onClick={() => router.navigate({ to: "/a/settings" })}
				>
					<ArrowLeftIcon />
					<p className="text-xl text-muted-foreground ">Help</p>
				</Button>
			</div>
			<form
				className="flex flex-col bg-card rounded-xl gap-2 p-6"
				id="edit-profile-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.AppField name="full_name">
						{(field) => <field.TextInput id="Edit Name" label="Edit Name" />}
					</form.AppField>
				</FieldGroup>
				<Field orientation="horizontal" className="justify-end">
					<Button type="submit" form="edit-profile-form">
						{isPending ? <Spinner /> : null}
						{isPending ? "Updating" : "Update Profile"}
					</Button>
				</Field>
			</form>
		</div>
	);
}
