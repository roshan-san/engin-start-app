import { createFileRoute } from "@tanstack/react-router";
import { useAppForm } from "~/components/form/AppForm";

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
				<form.AppField name="startup_name">
					{(field) => (
						<field.TextInput id="startup_name" label="Startup Name" />
					)}
				</form.AppField>
			</form>
		</div>
	);
}
