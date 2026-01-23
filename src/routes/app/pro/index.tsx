import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { buyProPlanFn } from "~/server/fn/payments";

export const Route = createFileRoute("/app/pro/")({
	component: RouteComponent,
});

export function RouteComponent() {
	const router = useRouter();
	const { isPending, mutate } = useMutation({
		mutationFn: buyProPlanFn,
		onSuccess: ({ checkout_url }) => {
			router.navigate({ href: checkout_url });
		},
		onError: () => {
			toast.error("Failed to initiate purchase. Please try again later.");
		},
	});

	return (
		<div className="p-4 flex items-center justify-center">
			<Button onClick={() => mutate({})} disabled={isPending}>
				Buy Pro Plan
			</Button>
		</div>
	);
}
