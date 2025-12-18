import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/AppForm";
import { nameFormOpts } from "~/components/form/onboard-forms/name-form";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Field, FieldGroup } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { createProfileFn } from "~/functions/profiles.fn";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/onboard/name")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useAppForm({
		...nameFormOpts,
		onSubmit: async () => {
			mutation.mutate();
		},
	});

	const mutation = useMutation({
		mutationFn: async () => {
			return await createProfileFn({
				data: {
					username: form.getFieldValue("username"),
					full_name: form.getFieldValue("full_name"),
				},
			});
		},
		onSuccess: async () => {
			toast.success("Profile created successfully!");
			await queryClient.invalidateQueries(profileQueryOptions());
			await queryClient.ensureQueryData(profileQueryOptions());
			navigate({ to: "/onboard/user-type" });
		},
		onError: (error) => {
			toast.error("Failed to create profile. Please try again.");
			console.error("Profile creation error:", error);
		},
	});

	return (
		<div className="col-span-6 flex items-center justify-center gap-2">
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Name and Username</CardTitle>
					<CardDescription>
						Please provide your full name and choose a username to get started.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="name-form"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="full_name">
								{(field) => <field.TextInput id="name" label="Name" />}
							</form.AppField>
							<form.AppField name="username">
								{(field) => <field.TextInput id="username" label="Username" />}
							</form.AppField>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal" className="justify-end">
						<Button
							type="submit"
							form="name-form"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? <Spinner /> : null}
							Next
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	);
}
