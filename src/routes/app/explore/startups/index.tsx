import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError } from "~/components/ui/field";
import { InputGroup, InputGroupInput } from "~/components/ui/input-group";

export const Route = createFileRoute("/app/explore/startups/")({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(
			z.object({
				search: z.string(),
			}),
		),
	});

	return (
		<div className="flex-1 flex flex-col">
			<div className="flex justify-start gap-2 py-2">
				<p className="text-xl ">Explore Startups</p>
			</div>

			<form
				className="flex-1 flex flex-col gap-4 w-full py-2"
				onSubmit={handleSubmit((data) => {
					console.log(data);
				})}
			>
				<Field data-invalid={!!errors.search}>
					<InputGroup className="p-2">
						<InputGroupInput
							id="search"
							autoComplete="off"
							placeholder="Search startups..."
							{...register("search")}
						/>
						<Search />
					</InputGroup>
					<FieldError>{errors.search?.message}</FieldError>
				</Field>
			</form>
		</div>
	);
}
