import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/AppForm";
import { Field } from "~/components/ui/field";

export const Route = createFileRoute("/app/dashboard/startup/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useAppForm({});
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<Field name="startup_name">
					{(field) => <field.TextInput label="Startup Name" />}
				</Field>
			</form>
		</div>
	);
}
