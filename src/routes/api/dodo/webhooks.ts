import { createFileRoute } from "@tanstack/react-router";
import { Webhooks } from "@dodopayments/tanstack";
import { env } from "~/env/server";
import { db } from "~/db";
import { profileTable } from "~/db/schema";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/dodo/webhooks")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				await Webhooks({
					webhookKey: env.DODO_PAYMENTS_WEBHOOK_SECRET,

					onSubscriptionRenewed: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "pro",
								subscription_status: "active",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Renewed for Customer:", email);
					},
					onSubscriptionActive: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "pro",
								subscription_status: "active",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Activated for Customer:", email);
					},
					onSubscriptionPaused: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "basic",
								subscription_status: "on_hold",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Paused for Customer:", email);
					},
					onSubscriptionOnHold: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "basic",
								subscription_status: "on_hold",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription On Hold for Customer:", email);
					},

					onSubscriptionFailed: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "basic",
								subscription_status: "inactive",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Failed for Customer:", email);
					},
					onSubscriptionExpired: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "basic",
								subscription_status: "inactive",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Expired for Customer:", email);
					},
					onSubscriptionCancelled: async ({ data }) => {
						const {
							customer: { email },
						} = data;
						await db
							.update(profileTable)
							.set({
								user_type: "basic",
								subscription_status: "inactive",
							})
							.where(eq(profileTable.email, email));
						console.log("Subscription Cancelled for Customer:", email);
					},

					onPayload: async ({ data, type }) => {
						console.log("Received Dodo Webhook:", type, data);
					},
				})(request);
				return new Response(null, { status: 200 });
			},
		},
	},
});
