import type { ErrorComponentProps } from "@tanstack/react-router";
import { toast } from "sonner";

export function GlobalError({ error }: Readonly<ErrorComponentProps>) {
	toast("Error:", { description: error.message });
	console.error("Global Error:", error);
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
			<img
				className="w-48 md:w-64"
				src="/illustrations/undraw_notify_rnwe.svg"
				alt=""
			/>
			<p className="text-xl font-bold">Some Error Occured</p>
		</div>
	);
}
