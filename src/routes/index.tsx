import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomePage,
});
function HomePage() {
	const router = useRouter();
	const engin = "~~~~~~~~~~~~~~~ The Fast Lane For Founders ~~~~~~~~~~~~~~~";
	const mobile = "~~~ The Fast Lane For Founders ~~~";

	return (
		<div className="flex flex-col items-center justify-center min-h-screen 	  py-8 ">
			<p className="hidden md:flex text-4xl text-transparent font-bold mb-8  bg-clip-text bg-linear-to-r from-gray-600 via-white to-accent">
				{engin}
			</p>
			<p className="md:hidden text-2xl text-transparent text-center font-bold mb-8  bg-clip-text bg-linear-to-r from-gray-600 via-white to-accent">
				{mobile}
			</p>

			<Button
				variant={"outline"}
				onClick={() => router.navigate({ to: "/app/dashboard" })}
			>
				Start Building
			</Button>
		</div>
	);
}
