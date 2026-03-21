export function GlobalSpinner() {
	return (
		<div className="flex ring flex-1 min-h-screen items-center justify-center">
			<div className="text-center">
				<div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"></div>
			</div>
		</div>
	);
}
