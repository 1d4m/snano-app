import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { playlists } from "@/lib/db/schema";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db
      .delete(playlists)
      .where(eq(playlists.id, Number(id)))
      .returning();

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db
      .select()
      .from(playlists)
      .where(eq(playlists.id, Number(id)));

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
