import { desc, eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import { logs, playlists } from "@/lib/db/schema";

/**
 * ログを取得する
 * @param playlistId プレイリストID
 * @returns ログリスト
 */
export async function getLogs(userId: string, playlistId?: string) {
  if (playlistId) {
    return await db
      .select()
      .from(logs)
      .innerJoin(playlists, eq(logs.playlist_id, playlists.id))
      .where(
        and(eq(playlists.user_id, userId), eq(logs.playlist_id, playlistId))
      )
      .orderBy(desc(logs.timestamp))
      .limit(10);
  }

  // ★ playlistId 無しでも userId で絞る！
  return await db
    .select({
      id: logs.id,
      playlistId: logs.playlist_id,
      title: logs.title,
      timestamp: logs.timestamp,
    })
    .from(logs)
    .innerJoin(playlists, eq(logs.playlist_id, playlists.id))
    .where(eq(playlists.user_id, userId))
    .orderBy(desc(logs.timestamp));
}

export type CreateLogInput = {
  playlistId: string;
  title: string;
  timestamp: string; // ISO string
};

/**
 * ログを登録する
 * @param input ログ登録情報
 * @returns 登録されたログ
 */
export async function createLog(input: CreateLogInput) {
  const { playlistId, title, timestamp } = input;

  const inserted = await db
    .insert(logs)
    .values({
      playlist_id: playlistId,
      title,
      timestamp,
    })
    .returning(); // ← INSERT結果使いたいならOK

  return inserted[0];
}
