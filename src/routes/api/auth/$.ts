import { createFileRoute } from "@tanstack/react-router";
import { getAuthServer } from "~/auth/auth";

const auth = getAuthServer();

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			GET: ({ request }) => {
				return auth.handler(request);
			},
			POST: ({ request }) => {
				return auth.handler(request);
			},
		},
	},
});
