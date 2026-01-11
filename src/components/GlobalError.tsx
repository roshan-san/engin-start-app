import type { ErrorComponentProps } from "@tanstack/react-router";

export function GlobalError({ error }: Readonly<ErrorComponentProps>) {
	console.error("Global Error:", error);
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
			<img
				className="w-50"
				src="/illustrations/undraw_notify_rnwe.svg"
				alt=""
			/>
			<p className="text-xl font-bold">Some Error Occured</p>
		</div>
	);
}
