import { createFileRoute } from "@tanstack/react-router";
import { GoogleButton } from "~/components/GoogleButton";

export const Route = createFileRoute("/login")({
	component: LoginForm,
});

function LoginForm() {
	return (
		<div className="flex min-h-screen items-center justify-center gap-6 p-6">
			<GoogleButton />
		</div>
	);
}
