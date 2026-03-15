import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const apiTokensTable = pgTable("api_tokens", {
	id: uuid("id").primaryKey().defaultRandom(),
	provider: text("provider").notNull().unique(),
	token: text("token").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
