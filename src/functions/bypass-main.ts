import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const bypassMain = createServerFn({ method: "POST" }).handler(() => {
	const cookie = getRequestHeaders().get("Cookie") ?? "";
	console.log("Bypass Main Cookie:", cookie);
	if (cookie.includes("admin")) {
		return { admin: true };
	}
	return { admin: false };
});
