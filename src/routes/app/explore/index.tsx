import { createFileRoute } from "@tanstack/react-router";
import { Icon, SearchIcon } from "lucide-react";
import { useAppForm } from "~/components/form/AppForm";

export const Route = createFileRoute("/app/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useAppForm({});
	return (
		<div className="flex-col flex-1 flex items-center justify-center gap-2">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<form.AppField name="search">
					{(field) => {
						return (
							<>
								<field.TextInput
									id="search"
									label=""
									placeholder="Explore Startups ...."
								/>
								<SearchIcon />
							</>
						);
					}}
				</form.AppField>
				<div className="bg-card flex justify-end w-full rounded-xl p-2"></div>
				<div className="w-100 h-100 bg-card rounded-xl justify-center flex items-center">
					<p>Explore</p>
				</div>
			</form>
		</div>
	);
}
