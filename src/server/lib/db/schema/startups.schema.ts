import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { profileTable } from "./profiles.schema";

export const startupTable = pgTable("startups", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	cin: text("cin").unique(),
	verified: text("verified").notNull().default("pending"),
	industry: text("industry"),

	owner_id: text("owner_id")
		.notNull()
		.references(() => profileTable.id, { onDelete: "cascade" }),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
	description: text("description").notNull(),
});
