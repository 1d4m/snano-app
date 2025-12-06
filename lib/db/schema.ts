// src/db/schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});
