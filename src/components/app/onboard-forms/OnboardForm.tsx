import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import {
	authClient,
	authQueryOptions,
	profileQueryOptions,
} from "~/auth/auth-client";
import { useAppForm } from "~/components/form/AppForm";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { createProfileFn } from "~/server/fn/profiles";
import { nameFormOpts } from "./name-form";

export default function OnboardForm() {
	const qc = useQueryClient();
	const router = useRouter();

	const {
		data: { user },
	} = useSuspenseQuery(authQueryOptions());

	const { mutate, isPending } = useMutation({
		mutationFn: createProfileFn,
		onSuccess: async () => {
			toast.success("Profile created");
			await qc.invalidateQueries(profileQueryOptions());
		},
		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	const form = useAppForm({
		...nameFormOpts,
		defaultValues: {
			full_name: user.name || "",
			username: "",
		},
		onSubmit: () => {
			if (isPending) return;
			mutate({
				data: {
					full_name: form.getFieldValue("full_name"),
					username: form.getFieldValue("username"),
					onboarding_complete: true,
				},
			});
		},
	});

	const handleSwitchAccount = async () => {
		try {
			toast.warning("Signing out…");
			await authClient.signOut();
			await qc.invalidateQueries(authQueryOptions());
			router.navigate({ to: "/login", replace: true });
		} catch (err) {
			console.error(err);
			toast.error("Failed to sign out");
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="w-full sm:max-w-md space-y-4">
				<header className="space-y-1">
					<p className="text-xl font-medium">Welcome, {user.name}</p>

					<Button
						variant="link"
						onClick={handleSwitchAccount}
						className="flex items-center gap-2 p-0 text-muted-foreground"
					>
						<ArrowDownUp className="h-4 w-4" />
						Switch ({user.email})
					</Button>
				</header>

				<form
					id="name-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-3"
				>
					<form.AppField name="full_name">
						{(field) => (
							<field.TextInput
								id="full_name"
								label="Name"
								placeholder={user.name}
							/>
						)}
					</form.AppField>

					<form.AppField name="username">
						{(field) => <field.TextInput id="username" label="Username" />}
					</form.AppField>
				</form>

				<Button
					type="submit"
					form="name-form"
					disabled={isPending}
					className="w-full"
				>
					{isPending && <Spinner />}
					Continue
				</Button>
			</div>
		</div>
	);
}
