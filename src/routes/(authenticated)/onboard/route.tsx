import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { useAppForm } from "~/components/form/AppForm";
import { nameFormOpts } from "~/components/form/onboard-forms/name-form";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { FieldGroup, Field } from "~/components/ui/field";
import { Spinner } from "~/components/ui/spinner";
import { createProfileFn } from "~/server/fn/profiles.fn";
import authClient from "~/lib/auth/auth-client";
import { authQueryOptions, profileQueryOptions } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/(authenticated)/onboard")({
	component: RouteComponent,
	beforeLoad: async ({ context, location }) => {
		const profile = await context.queryClient.ensureQueryData(
			profileQueryOptions(),
		);
		const path = location.pathname;

		let nextStep: string | null = null;

		if (!profile) {
			nextStep = "/onboard/name";
		} else if (profile.onboarding_complete) {
			nextStep = "/a/dashboard";
		}
		if (nextStep && path !== nextStep) {
			throw redirect({ to: nextStep });
		}
	},
});

function RouteComponent() {
	const { queryClient } = Route.useRouteContext();

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
					onboarding_complete: true,
				},
			});
		},
		onSuccess: async () => {
			toast.success("Profile created successfully!");
			await queryClient.invalidateQueries(profileQueryOptions());
			await queryClient.ensureQueryData(profileQueryOptions());
			router.navigate({ to: "/a/dashboard" });
		},
		onError: (error) => {
			toast.error("Failed to create profile. Please try again.");
			console.error("Profile creation error:", error);
		},
	});
	const router = useRouter();

	const handleSubmit = async () => {
		router.invalidate();
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
	};
	return (
		<div className="grid min-h-screen grid-cols-12 gap-2 p-2">
			<div className="col-span-6 flex items-center justify-center bg-yellow-500">
				<p className="text-2xl font-bold">Some Illustration</p>
			</div>
			<div className="col-span-6 flex items-center justify-center gap-2">
				<Card className="w-full sm:max-w-md">
					<CardHeader>
						<CardTitle>Name and Username</CardTitle>
						<div>
							<Button
								className="flex gap-2 text-base text-muted-foreground"
								onClick={handleSubmit}
								variant={"ghost"}
							>
								<ArrowDownUp className="w-5 h-5 p-1" />
								Switch Account
							</Button>
						</div>
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
									{(field) => (
										<field.TextInput id="username" label="Username" />
									)}
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
		</div>
	);
}
