/// <reference types="vite/client" />
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { Toaster } from "~/components/ui/sonner";
import appCss from "~/styles.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Engin - The Fast Lane For Founders",
			},
			{
				name: "description",
				content: "",
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Engin",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon-96x96.png",
				sizes: "96x96",
			},
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "shortcut icon", href: "/favicon.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster richColors />
				<Scripts />
			</body>
		</html>
	);
}
