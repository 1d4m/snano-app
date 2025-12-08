import { db } from "@/lib/db";
import { playlist_items } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("playlistId");

  if (!playlistId) {
    return NextResponse.json(
      { error: "playlistId is required" },
      { status: 400 }
    );
  }

  const result = await db
    .select()
    .from(playlist_items)
    .where(eq(playlist_items.playlist_id, playlistId));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const { title, description, limit_at, is_completed, playlist_id } =
    await request.json();
  const result = await db
    .insert(playlist_items)
    .values({
      title,
      description,
      limit_at,
      is_completed,
      playlist_id,
    })
    .returning();
  return NextResponse.json(result);
}
