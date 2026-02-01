import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { createStartupFn } from "~/server/functions/startups";

export function CreateStartup() {
	const { qc } = useRouteContext({ from: "/app" });

	const { mutate, isPending } = useMutation({
		mutationFn: createStartupFn,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-startups"] });
			console.log("Startup created successfully");
		},
	});
	return (
		<div className=" absolute z-50 bottom-12 right-12">
			<Button
				variant={"outline"}
				onClick={() =>
					mutate({
						data: {
							name: "New Startup",
							description: "This is my new startup",
						},
					})
				}
			>
				<PlusIcon className="h-4 w-4" />
				{isPending ? "Creating..." : "Create Startup"}
			</Button>
		</div>
	);
}
