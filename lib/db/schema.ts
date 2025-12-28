// src/db/schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const playlist_items = pgTable("playlist_items", {
  id: serial("id").primaryKey(),
  playlist_id: text("playlist_id").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  limit_at: text("limit_at"),
  is_completed: text("is_completed").notNull(),
});
