import { Spinner } from "./ui/spinner";

export const LoadingPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-6 gap-6">
			<Spinner />
		</div>
	);
};
