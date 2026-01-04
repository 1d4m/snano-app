import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { createLog, getLogs } from "@/lib/repositories/log";

/**
 * ログ取得
 * @param request
 * @returns
 */
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).searchParams;
  const playlistId = params.get("playlistId") || undefined;

  const data = await getLogs(session.user.id, playlistId);
  return NextResponse.json(data);
}

/**
 * ログ登録
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playlistId, title, timestamp } = body;

    if (!playlistId || !title || !timestamp) {
      return NextResponse.json(
        { message: "playlistId, title, timestamp は必須です" },
        { status: 400 }
      );
    }

    const log = await createLog({
      playlistId,
      title,
      timestamp,
    });

    return NextResponse.json(log, { status: 201 });
  } catch (e) {
    console.error("Log POST error:", e);

    return NextResponse.json(
      { message: "ログ登録に失敗しました" },
      { status: 500 }
    );
  }
}
