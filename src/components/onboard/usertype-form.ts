import { formOptions } from "@tanstack/react-form";
import z from "zod";

const UserTypeSchema = z.object({
	user_type: z.enum(["contributor", "founder", "investor"]),
});

const defaultValues: z.infer<typeof UserTypeSchema> = {
	user_type: "contributor",
};

export const userTypeFormOps = formOptions({
	defaultValues,
	validators: {
		onDynamic: UserTypeSchema,
	},
});
