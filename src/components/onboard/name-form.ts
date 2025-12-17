import { formOptions } from "@tanstack/react-form";
import z from "zod";

const NameFormSchema = z.object({
	full_name: z
		.string()
		.trim()
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name is too long")
		.regex(
			/^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
			"Full name can only contain letters and single spaces",
		),

	username: z
		.string()
		.trim()
		.toLowerCase()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must be at most 30 characters")
		.regex(
			/^[a-z0-9_]+$/,
			"Username can only contain lowercase letters, numbers, and underscores",
		),
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
