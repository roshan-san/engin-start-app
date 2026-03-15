import z from "zod";

export const EditProfileSchema = z.object({
	full_name: z
		.string()
		.trim()
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name is too long")
		.regex(
			/^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
			"Full name can only contain letters and single spaces",
		),
});
