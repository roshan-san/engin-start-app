import { createFileRoute } from "@tanstack/react-router";
import VerifyPanForm from "~/components/app/dashboard/VerifyPanForm";

export const Route = createFileRoute("/app/dashboard/startup/new/verifypan")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex-1 flex items-center justify-around gap-6 p-6 ">
			<p>Verify PAN Page</p>
			<VerifyPanForm />
		</div>
	);
}
