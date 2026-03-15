import { createMiddleware, createServerFn } from "@tanstack/react-start";
import z from "zod";
import { env } from "~/env/server";
import { db } from "../lib/db";
import { apiTokensTable } from "../lib/db/schema";
import { eq } from "drizzle-orm";

export const sandboxMiddleware = createMiddleware().server(async ({ next }) => {
	const data = await db.query.apiTokensTable.findFirst({
		where({ provider }, { eq }) {
			return eq(provider, "sandbox");
		},
	});
	if (data === undefined) {
		throw new Error("Sandbox token not found");
	}

	//expiry agalana retrun teh existing token
	if (data.expiresAt > new Date()) {
		return next({
			context: {
				authToken: data.token,
			},
		});
	}

	// if expired , fetch new token

	const url = `${env.SANDBOX_URL}/authenticate`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"x-api-key": env.SANDBOX_KEY,
			"x-api-secret": env.SANDBOX_SECRET,
		},
	});
	if (!res.ok) {
		throw new Error(
			`Sandbox authentication failed (${res.status} ${res.statusText})`,
		);
	}

	const json = await res.json();
	const new_token = json.data.access_token;
	// update in db
	const expiresAt = new Date();
	expiresAt.setHours(expiresAt.getHours() + 4); // set expiry to next 4 hour

	await db
		.update(apiTokensTable)
		.set({
			token: new_token,
			expiresAt: expiresAt,
		})
		.where(eq(apiTokensTable.provider, "sandbox"));

	return next({
		context: {
			authToken: new_token,
		},
	});
});

export const verifyPanFn = createServerFn({ method: "GET" })
	.middleware([sandboxMiddleware])
	.inputValidator(
		z.object({
			name: z.string().min(1),
			pan: z.string().min(1),
			dob: z.string().min(1),
		}),
	)
	.handler(async ({ data, context }) => {
		const { name, pan, dob } = data;
		const { authToken } = context;
		console.log("Verifying PAN with data:", authToken);
		const url = `${env.SANDBOX_URL}/kyc/pan/verify`;
		const res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: authToken,
				"x-api-key": env.SANDBOX_KEY,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"@entity": "in.co.sandbox.kyc.pan_verification.request",
				pan: pan,
				name_as_per_pan: name,
				date_of_birth: dob,
				consent: "Y",
				reason: "For KYC purposes",
			}),
		});
		if (!res.ok) {
			throw new Error(
				`PAN verification failed (${res.status} ${res.statusText})`,
			);
		}
		const result = await res.json();
		console.log("PAN verification result:", result);
		return result;
	});

export const getDetailsFromMcaFn = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			cin: z.string().min(5, "CIN is too short").max(20, "CIN is too long"),
		}),
	)
	.handler(async ({ data }) => {
		const url = `${env.SANDBOX_URL}/mca/company/master-data/search/`;
		const { cin } = data;
		const res = await fetch(url, {
			method: "GET",
			body: JSON.stringify({
				"@entity": "in.co.sandbox.kyc.mca.master_data.request",
				id: cin,
				consent: "Y",
				reason: "For KYC purposes",
			}),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		if (!res.ok) {
			throw new Error(`MCA API failed (${res.status} ${res.statusText})`);
		}
		const json = await res.json();
		return json;
	});
