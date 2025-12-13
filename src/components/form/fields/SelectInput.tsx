import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "~/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { useFieldContext } from "../form-context";

type Option = {
	value: string;
	label: string;
};

export function SelectInput({
	list,
	trigger,
}: {
	list: Option[];
	trigger: string;
}) {
	const field = useFieldContext<string>();

	return (
		<Field
			data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
		>
			<FieldLabel htmlFor={field.name}>Country</FieldLabel>

			<Select
				value={field.state.value}
				onValueChange={(value) => field.handleChange(value)}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={trigger} />
				</SelectTrigger>

				<SelectContent>
					{list.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<FieldDescription>Select your country of residence.</FieldDescription>
			<FieldError errors={field.state.meta.errors} />
		</Field>
	);
}
