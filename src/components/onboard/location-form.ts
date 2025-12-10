import { formOptions } from "@tanstack/react-form";
import z from "zod";

const LocationFormSchema = z.object({
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});
const defaultValues: z.infer<typeof LocationFormSchema> = {};

export const locationFormOps = formOptions({
  defaultValues,
  validators: {
    onChange: LocationFormSchema,
  },
});
