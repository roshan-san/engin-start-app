// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "@tanstack/react-router";
// import { useForm } from "react-hook-form";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import z from "zod";
// import { Field, FieldError, FieldLabel } from "~/components/ui/field";

// const StartupFormSchema = z.object({
// 	cin: z.string().min(5, "cin is too short").max(20, "cin is too long"),
// });

// export function AddStartupForm() {
// 	const router = useRouter();
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors, isSubmitting },
// 	} = useForm({
// 		resolver: zodResolver(StartupFormSchema),
// 	});

// 	return (
// 		<form
// 			className="flex flex-1 w-full max-w-2xl flex-col gap-6 bg-card shadow-lg border border-accent shadow-accent rounded-xl justify-center p-6"
// 			onSubmit={handleSubmit((data) => {
// 				console.log("FORM DATA:", data);
// 				router.navigate({
// 					to: "/app/dashboard/startup/new/confirm",
// 					search: { cin: data.cin },
// 				});
// 			})}
// 		>
// 			<p className="font-bold text-2xl text-shadow-2xs text-accent text-shadow-accent">
// 				Add Your Startup
// 			</p>
// 			<Field>
// 				<Input
// 					inputMode="numeric"
// 					{...register("cin")}
// 					placeholder="Enter CIN Number"
// 				/>
// 				<FieldError>{errors.cin?.message}</FieldError>
// 			</Field>
// 			<Button type="submit" variant={"default"} disabled={isSubmitting}>
// 				{isSubmitting ? "Processing...	" : "Continue"}
// 			</Button>
// 		</form>
// 	);
// }
