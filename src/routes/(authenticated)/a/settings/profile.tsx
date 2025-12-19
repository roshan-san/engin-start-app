import {
	EditProfileOps,
	type EditProfileSchema,
} from "~/components/form/settings-forms/edit-profile";
import { Button } from "~/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/AppForm";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "~/functions/profiles.fn";
import type z from "zod";
import { FieldGroup } from "~/components/ui/field";

export const Route = createFileRoute("/(authenticated)/a/settings/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { profile } = Route.useRouteContext();
	const defaultValues: z.infer<typeof EditProfileSchema> = {
		full_name: profile.full_name,
	};

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
	});
	return (
		<div className="flex-1 bg-card rounded-xl">
			<form
				className="flex flex-col gap-2 p-2"
				id="edit-profile-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.AppField name="full_name">
						{(field) => <field.TextInput id="name" label="Name" />}
					</form.AppField>
				</FieldGroup>
				<div className="flex justify-end gap-2 p-2">
					<Button type="submit" disabled={isPending}>
						{isPending ? "Updating..." : "Update Profile"}
					</Button>
				</div>
			</form>
		</div>
	);
}
