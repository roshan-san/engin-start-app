import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useFieldContext } from "../form-context";

function focusNextField(e: React.KeyboardEvent<HTMLInputElement>) {
	if (e.key !== "Enter") return;
	e.preventDefault();
	const form = e.currentTarget.form;
	if (!form) return;
	const inputs = Array.from(
		form.querySelectorAll<HTMLInputElement>(
			'input:not([type="hidden"]):not([disabled])',
		),
	);

	const index = inputs.indexOf(e.currentTarget);
	const next = inputs[index + 1];

	if (next) {
		next.focus();
	} else {
		form.requestSubmit();
	}
}

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

	const showError =
		field.state.meta.isTouched && field.state.meta.errors.length > 0;

	return (
		<Field className="flex flex-col gap-1">
			<FieldLabel htmlFor={id} className="text-base">
				{label}
			</FieldLabel>

			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				onKeyDown={focusNextField}
			/>

			{description && <FieldDescription>{description}</FieldDescription>}

			{showError && (
				<FieldError>
					{field.state.meta.errors.map((e) => e?.message).join(", ")}
				</FieldError>
			)}
		</Field>
	);
}
