import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { logs } from "@/lib/db/schema";

/**
 * ログを取得する
 * @param playlistId プレイリストID
 * @returns ログリスト
 */
export async function getLogs(playlistId?: string) {
  if (playlistId) {
    return await db
      .select()
      .from(logs)
      .where(eq(logs.playlist_id, playlistId))
      .orderBy(desc(logs.timestamp))
      .limit(10);
  }

  return await db.select().from(logs).orderBy(desc(logs.timestamp)).limit(10);
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
