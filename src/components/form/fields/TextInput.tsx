import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useFieldContext } from "../form-context";

export default function TextInput({
	label,
	description,
	placeholder,
	id,
	type = "text",
}: {
	label: string;
	placeholder?: string;
	id: string;
	description?: string;
	type?: string;
}) {
	const field = useFieldContext<string>();
	return (
		<Field className="flex">
			<FieldLabel className="text-base" htmlFor={id}>
				{label}
			</FieldLabel>
			<Input
				className="w-full max-w-md"
				id={id}
				type={type}
				placeholder={placeholder}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{!field.state.meta.isValid && (
				<FieldError>
					{field.state.meta.errors.map((error) => error?.message).join(", ")}
				</FieldError>
			)}
		</Field>
	);
}
