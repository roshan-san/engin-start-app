// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";
// import { Button } from "~/components/ui/button";
// import { Field, FieldLabel, FieldError } from "~/components/ui/field";
// import { Input } from "~/components/ui/input";
// import { verifyPanFn } from "~/server/functions/sandbox";

// const VerifyPanSchema = z.object({
// 	businessName: z.string().min(2).max(100),
// 	panNumber: z.string().length(10),
// 	dob: z.string().min(10).max(10),
// });

// export default function VerifyPanForm() {
// 	const { mutate } = useMutation({
// 		mutationFn: verifyPanFn,
// 		onError: (error) => {
// 			toast.error("PAN verification failed", {
// 				description: error.message,
// 			});
// 		},
// 		onSuccess: (data) => {
// 			toast.success("PAN verified successfully");
// 			console.log("PAN Verification Data:", data);
// 		},
// 	});
// 	const {
// 		register,
// 		formState: { errors, isSubmitting },
// 		handleSubmit,
// 	} = useForm({
// 		resolver: zodResolver(VerifyPanSchema),
// 	});
// 	return (
// 		<form
// 			className="flex flex-col gap-2 w-full max-w-md p-6 rounded-2xl bg-card "
// 			onSubmit={handleSubmit((data) =>
// 				mutate({
// 					data: {
// 						name: data.businessName,
// 						pan: data.panNumber,
// 						dob: data.dob,
// 					},
// 				}),
// 			)}
// 		>
// 			<p className="text-2xl  font-light mb-4">Verify PAN Details</p>
// 			<Field>
// 				<FieldLabel>Business Name</FieldLabel>
// 				<Input
// 					type="text"
// 					{...register("businessName")}
// 					placeholder="Enter Bussines Name"
// 				/>
// 				<FieldError> {errors.businessName?.message} </FieldError>
// 			</Field>
// 			<Field>
// 				<FieldLabel>PAN Number</FieldLabel>
// 				<Input
// 					type="text"
// 					{...register("panNumber")}
// 					placeholder="Enter PAN Number"
// 				/>
// 				<FieldError> {errors.panNumber?.message} </FieldError>
// 			</Field>
// 			<Field>
// 				<FieldLabel>Date of Birth</FieldLabel>
// 				<Input
// 					type="text"
// 					{...register("dob")}
// 					placeholder="Enter Date of Birth (DD/MM/YYYY)"
// 				/>
// 				<FieldError> {errors.dob?.message} </FieldError>
// 			</Field>
// 			<Button type="submit" disabled={isSubmitting}>
// 				{isSubmitting ? "Verifying..." : "Verify PAN"}
// 			</Button>
// 		</form>
// 	);
// }
