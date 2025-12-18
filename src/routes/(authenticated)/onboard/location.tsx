import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/AppForm";
import { locationFormOps } from "~/components/form/onboard-forms/location-form";
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
import { updateProfileFn } from "~/functions/profiles.fn";
import { profileQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/(authenticated)/onboard/location")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useAppForm({
		...locationFormOps,
		onSubmit: async () => {
			mutation.mutate();
		},
	});

	const mutation = useMutation({
		mutationFn: async () => {
			return await updateProfileFn({
				data: {
					city: form.getFieldValue("city"),
					state: form.getFieldValue("state"),
					country: form.getFieldValue("country"),
					onboarding_complete: true,
				},
			});
		},
		onSuccess: async () => {
			toast.success("Location Updated successfully!");
			await queryClient.invalidateQueries(profileQueryOptions());
			await queryClient.ensureQueryData(profileQueryOptions());
			navigate({ to: "/a/dashboard" });
		},
		onError: (error) => {
			const msg = "Failed to update Location. Please try again.";
			toast.error(msg);
			console.error(msg, error);
		},
	});

	const list = [
		{ value: "NY", label: "New York" },
		{ value: "CA", label: "California" },
		{ value: "TX", label: "Texas" },
		{ value: "FL", label: "Florida" },
		{ value: "IL", label: "Illinois" },
	];

	return (
		<div className="col-span-6 flex min-h-screen items-center justify-center">
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Name and Username</CardTitle>
					<CardDescription>
						Please provide your full name and choose a username to get started.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="location-form"
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.AppField name="city">
								{(field) => (
									<field.SelectInput trigger="Choose State" list={list} />
								)}
							</form.AppField>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal">
						<Button
							type="submit"
							form="location-form"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? <Spinner /> : null}
							Submit
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	);
}
