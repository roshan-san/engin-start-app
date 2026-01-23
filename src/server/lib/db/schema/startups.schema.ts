import { pgTable, text } from "drizzle-orm/pg-core";

export const startupTable = pgTable("startup", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
});
