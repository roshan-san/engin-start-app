// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
// import { createFileRoute } from "@tanstack/react-router";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { getDetailsFromMcaFn } from "~/server/functions/sandbox";
// import { AddStartupFn } from "~/server/functions/startups";

// export const Route = createFileRoute("/app/dashboard/startup/new/confirm")({
// 	component: RouteComponent,
// 	validateSearch: z.object({
// 		cin: z.string().min(5, "CIN is too short").max(20, "CIN is too long"),
// 	}),
// });

// const ConfirmationSchema = z.object({
// 	reg_date: z.date(),
// });

// function RouteComponent() {
// 	const { cin } = Route.useSearch();
// 	const { data } = useSuspenseQuery({
// 		queryKey: ["startup-confirmation", cin],
// 		queryFn: () => getDetailsFromMcaFn({ data: { cin } }),
// 	});
// 	const { mutate } = useMutation({
// 		mutationFn: AddStartupFn,
// 	});

// 	const {
// 		formState: { errors },
// 		register,
// 		handleSubmit,
// 	} = useForm({
// 		resolver: zodResolver(ConfirmationSchema),
// 	});
// 	return (
// 		<div className="flex-1  items-center justify-center flex">
// 			Confirm Startup Creation Page for cin: {cin}
// 			<pre>{JSON.stringify(data, null, 2)}</pre>
// 		</div>
// 	);
// }
