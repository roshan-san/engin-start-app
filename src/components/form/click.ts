export function focusNextField(e: React.KeyboardEvent<HTMLInputElement>) {
	if (e.key !== "Enter") return;
	e.preventDefault();
	const form = e.currentTarget.form;
	if (!form) return;
	const inputs = Array.from(
		form.querySelectorAll<HTMLInputElement>(
			'input:not([type="hidden"]):not([disabled])',
		),
	);

	const index = inputs.indexOf(e.currentTarget);
	const next = inputs[index + 1];

	if (next) {
		next.focus();
	} else {
		form.requestSubmit();
	}
}
