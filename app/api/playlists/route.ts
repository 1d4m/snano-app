import { db } from "@/lib/db";
import { playlists } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.select().from(playlists);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const result = await db
    .insert(playlists)
    .values({
      title,
    })
    .returning();
  return NextResponse.json(result);
}
