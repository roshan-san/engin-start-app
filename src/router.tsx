import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";
import { GlobalError } from "./components/globals/GlobalError";
import { GlobalNotFound } from "./components/globals/GlobalNotFound";

export function getRouter() {
	const qc = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 1000 * 60 * 2, // 2 minutes
			},
		},
	});

	const router = createRouter({
		routeTree,
		context: { qc },
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: GlobalError,
		defaultNotFoundComponent: GlobalNotFound,
		scrollRestoration: true,
		defaultStructuralSharing: true,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: qc,
		handleRedirects: true,
		wrapQueryClient: true,
	});

	return router;
}
