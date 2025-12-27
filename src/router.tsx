import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";
import { GlobalError } from "./components/GlobalError";

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
