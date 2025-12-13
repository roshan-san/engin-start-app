import { formOptions } from "@tanstack/react-form";
import z from "zod";

const NameFormSchema = z.object({
	full_name: z.string().min(2, "Full name must be at least 2 characters"),
	username: z.string().min(2, "Username must be at least 2 characters"),
});

const defaultValues: z.infer<typeof NameFormSchema> = {
	full_name: "",
	username: "",
};

export const nameFormOpts = formOptions({
	defaultValues,
	validators: {
		onChange: NameFormSchema,
	},
});
