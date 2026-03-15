import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AddStartupForm } from "~/components/app/dashboard/AddStartupForm";
import { UnregisteredStartupForm } from "~/components/app/dashboard/UnregistredStartupForm";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/app/dashboard/startup/new/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [reg, setChoice] = useState<boolean | null>(null);
	return (
		<div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-6  p-4">
			<img
				className="w-full md:w-1/3   mx-auto h-auto"
				src="/illustrations/undraw_agreement_ftet.svg"
				alt=""
			/>
			{reg ? (
				<AddStartupForm />
			) : reg === false ? (
				<UnregisteredStartupForm />
			) : (
				<div className="flex flex-col gap-4 p-2 max-w-2xl w-full">
					<p className=" text-2xl font-bold">
						Have you registered your startup with Startup India ?
					</p>
					<p className="text-left text-sm text-muted-foreground ">
						We strongly recommend registering your startup to take advantage of
						government schemes and to build trust with both investors and
						customers. If your startup is not already registered, you may still
						add your startup details now and update them later once the
						registration is complete :).
					</p>
					<p className="text-center text-muted-foreground"></p>
					<div className="flex gap-4 justify-end">
						<Button
							className="w-1/4"
							variant={"default"}
							onClick={() => setChoice(true)}
						>
							Yes
						</Button>
						<Button
							className="w-1/4"
							variant={"outline"}
							onClick={() => setChoice(false)}
						>
							No
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
