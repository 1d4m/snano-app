import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { playlist_items } from "@/lib/db/schema";

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
  const data = await request.json();

  const result = await db.insert(playlist_items).values(data).returning();
  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db.delete(playlist_items).where(eq(playlist_items.id, id));

  return NextResponse.json({ message: "Deleted successfully" });
}
