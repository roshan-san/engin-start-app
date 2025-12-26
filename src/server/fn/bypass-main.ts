import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const bypassMainFn = createServerFn({ method: "POST" }).handler(() => {
	const cookie = getRequestHeaders().get("Cookie") ?? "";
	if (cookie.includes("admin")) {
		return { admin: true };
	}
	return { admin: false };
});
