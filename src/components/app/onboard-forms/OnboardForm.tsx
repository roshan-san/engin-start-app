import { ArrowDownUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import {
	authClient,
	authQueryOptions,
	profileQueryOptions,
} from "~/auth/auth-client";
import { Spinner } from "~/components/ui/spinner";
import { createProfileFn } from "~/server/fn/profiles";
import { useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { NameFormSchema } from "./name-form";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";

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
			router.navigate({ to: "/app/dashboard" });
			await qc.invalidateQueries(profileQueryOptions());
		},
		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(NameFormSchema),
		mode: "onChange",
		defaultValues: {
			full_name: user.name,
			username: "",
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
		<div className="flex bg-card rounded-2xl flex-col gap-4 p-6 items-center w-full max-w-md">
			<header className="flex flex-col items-start w-full">
				<p className="text-xl font-bold">
					Welcome ,<span className="text-foreground">{user.name} !</span>
				</p>
				<Button
					variant="link"
					onClick={handleSwitchAccount}
					className="flex items-center p-0 text-muted-foreground"
				>
					<ArrowDownUp className="h-4 w-4" />
					Switch ({user.email})
				</Button>
			</header>
			<form
				className="flex flex-col gap-4 w-full"
				onSubmit={handleSubmit((data) =>
					mutate({
						data: data,
					}),
				)}
			>
				<Field data-invalid={!!errors.full_name}>
					<FieldLabel htmlFor="full_name">Full name</FieldLabel>
					<Input id="full_name" {...register("full_name")} />
					<FieldError>{errors.full_name?.message}</FieldError>
				</Field>
				<Field data-invalid={!!errors.username}>
					<FieldLabel htmlFor="username">Username</FieldLabel>
					<Input id="username" {...register("username")} />
					<FieldError>{errors.username?.message}</FieldError>
				</Field>
				<Button type="submit" disabled={isPending} className="w-full">
					{isPending && <Spinner />}
					Continue
				</Button>
			</form>
		</div>
	);
}
