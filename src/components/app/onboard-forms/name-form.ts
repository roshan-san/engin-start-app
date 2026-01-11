import { z } from "zod";

export const NameFormSchema = z.object({
	full_name: z
		.string()
		.trim()
		.min(4, "Full name must be at least 4 characters")
		.max(100, "Full name is too long")
		.regex(
			/^[A-Za-z]+(?: [A-Za-z]+)*$/,
			"Full name can only contain letters and single spaces, and must start with a letter",
		),

	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must be at most 30 characters")
		.regex(
			/^[a-z][a-z0-9_]*$/,
			"Username must start with a letter and contain no spaces",
		)
		.transform((v) => v.toLowerCase()),
});
