import DodoPayments from "dodopayments";
import { env } from "~/lib/env/server";

export const dodoClient = new DodoPayments({
	bearerToken: env.DODO_PAYMENTS_API_KEY,
	environment: "test_mode", // defaults to 'live_mode'
});
