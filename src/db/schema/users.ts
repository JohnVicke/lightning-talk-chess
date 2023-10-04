import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id", { length: 256 }).notNull().primaryKey(),
  displayName: text("display_name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull(),
});
