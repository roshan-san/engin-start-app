import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export const Route = createFileRoute("/app/dashboard/startup/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(
			z.object({
				name: z
					.string()
					.min(2, "Name must be at least 2 characters")
					.max(100, "Name is too long"),
			}),
		),
	});
	return (
		<div>
			<form
				onSubmit={handleSubmit((data) => {
					console.log(data);
				})}
			>
				<Field data-invalid={!!errors}>
					<FieldLabel htmlFor="name">Startup Name</FieldLabel>
					<Input id="name" {...register("name")} />
					<FieldError>{errors.name?.message}</FieldError>
				</Field>
			</form>
		</div>
	);
}
