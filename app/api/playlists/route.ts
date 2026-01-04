import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { playlists } from "@/lib/db/schema";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(playlists)
    .where(eq(playlists.user_id, session.user.id));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title } = await request.json();

  const result = await db
    .insert(playlists)
    .values({
      title,
      user_id: session.user.id,
    })
    .returning();

  return NextResponse.json(result);
}
