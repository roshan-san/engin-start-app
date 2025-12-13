import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth/auth";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
	const { headers, response } = await auth.api.getSession({
		headers: getRequest().headers,
		returnHeaders: true,
	});

	// If there is no authenticated user, return null (avoid truthy empty objects)
	if (!response) {
		return null;
	}

	// UPDATE COOKIES IF NEEDED
	const cookies = headers.getSetCookie();
	if (cookies.length) {
		setResponseHeader("Set-Cookie", cookies);
	}

	return {
		user: response.user,
		session: response.session,
	};
});
