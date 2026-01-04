import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * ユーザー情報を保持するテーブル
 *
 * - id: ユーザーの一意な識別子
 * - name: ユーザーの表示名
 * - email: ユーザーのメールアドレス（ユニーク）
 * - image: ユーザーのプロフィール画像URL
 */
const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  image: text("image"),
});

/**
 * プレイリスト情報を保持するテーブル
 *
 * - ユーザーが作成した「プレイリスト」の単位
 * - 1つのプレイリストには複数の playlist_items が紐づく
 */
const playlists = pgTable("playlists", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
});

/**
 * プレイリストに紐づく項目（タスクなど）を保持するテーブル
 *
 * - 各 playlist に複数存在する
 * - 実際のタスクや項目の内容を表す
 */
const playlist_items = pgTable("playlist_items", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  playlist_id: text("playlist_id")
    .notNull()
    .references(() => playlists.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  limit_at: text("limit_at"),
  is_completed: text("is_completed").notNull(),
});

/**
 * 項目の操作履歴を記録するテーブル
 *
 * - いつ何が起きたかを記録する用途
 * - 例: 完了, 作成, 削除など
 */
const logs = pgTable("logs", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  playlist_id: text("playlist_id")
    .notNull()
    .references(() => playlists.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).notNull(),
});

export { users, playlists, playlist_items, logs };
