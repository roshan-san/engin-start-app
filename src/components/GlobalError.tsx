import type { ErrorComponentProps } from "@tanstack/react-router";

export function GlobalError({ error }: Readonly<ErrorComponentProps>) {
	console.error("Global Error:", error);
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
			<p className="text-xl text-muted-foreground">Error Occured</p>
		</div>
	);
}
