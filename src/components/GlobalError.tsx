import {
	ErrorComponent,
	type ErrorComponentProps,
} from "@tanstack/react-router";

export function GlobalError({ error }: Readonly<ErrorComponentProps>) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
			<ErrorComponent error={error} />
		</div>
	);
}
