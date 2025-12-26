import { useMutation } from "@tanstack/react-query";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import authClient from "~/lib/auth/auth-client";
import { Button } from "./ui/button";

export function GoogleButton(props: { redirectUrl: string }) {
	const { isPending, mutate } = useMutation({
		mutationFn: async () =>
			await authClient.signIn.social(
				{
					provider: "google",
					callbackURL: props.redirectUrl,
				},
				{
					onError: ({ error }) => {
						toast.error(error.message || `An error occurred during sign-in.`);
					},
				},
			),
	});
	return (
		<Button
			variant="outline"
			className="w-fit"
			type="button"
			disabled={isPending}
			onClick={() => mutate()}
		>
			<FaGoogle />
			Login with Google
		</Button>
	);
}
