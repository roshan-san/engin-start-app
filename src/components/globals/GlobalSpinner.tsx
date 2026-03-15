export function GlobalSpinner() {
	return (
		<div className="flex ring flex-1 min-h-screen items-center justify-center">
			<div className="text-center">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"></div>
				<h2 className="text-xl tracking-widest mt-4">Loading...</h2>
			</div>
		</div>
	);
}
