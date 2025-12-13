import { createFormHook } from "@tanstack/react-form";
import { SelectInput } from "./fields/SelectInput";
import TextInput from "./fields/TextInput";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldContext: fieldContext,
	formContext: formContext,
	fieldComponents: {
		TextInput: TextInput,
		SelectInput: SelectInput,
	},
	formComponents: {},
});
