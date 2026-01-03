"use client";

import dayjs from "dayjs";
import { useState, useMemo } from "react";

import { useReadLogs } from "@/hooks/useLog";
import { useReadPlaylists } from "@/hooks/usePlaylists";

export default function LogPage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | "all">(
    "all"
  );

  // 🎧 プレイリスト取得
  const {
    data: playlists = [],
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
  } = useReadPlaylists();

  // 📗 ログ取得
  const {
    data: logs = [],
    isLoading,
    isError,
  } = useReadLogs(
    selectedPlaylistId === "all" ? undefined : selectedPlaylistId
  );

  // 今年の草範囲
  const days = useMemo(() => {
    const now = dayjs();

    const start = now.startOf("year").startOf("week");
    const end = now.endOf("year").endOf("week");

    const arr: string[] = [];
    let cursor = start;

    while (cursor.isBefore(end) || cursor.isSame(end)) {
      arr.push(cursor.format("YYYY-MM-DD"));
      cursor = cursor.add(1, "day");
    }

    return arr;
  }, []);

  // 日毎カウント
  const countMap = useMemo(() => {
    const map: Record<string, number> = {};
    logs.forEach((log) => {
      const date = dayjs(log.timestamp).format("YYYY-MM-DD");
      map[date] = (map[date] ?? 0) + 1;
    });
    return map;
  }, [logs]);

  const getLevel = (count: number | undefined) => {
    if (!count) return "bg-neutral-900";
    if (count === 1) return "bg-emerald-900";
    if (count === 2) return "bg-emerald-800";
    if (count === 3) return "bg-emerald-700";
    return "bg-emerald-600";
  };

  // 最新10件
  const latestLogs = useMemo(() => {
    return [...logs]
      .sort(
        (a, b) => dayjs(b.timestamp).valueOf() - dayjs(a.timestamp).valueOf()
      )
      .slice(0, 10);
  }, [logs]);

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="pb-[116px]">
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="font-bold text-sm">ログ</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* 🎧 プレイリスト選択 */}
        <div>
          <label className="text-sm text-neutral-400 mr-2">プレイリスト</label>

          {isPlaylistLoading && (
            <span className="text-neutral-500 text-sm">読み込み中...</span>
          )}

          {isPlaylistError && (
            <span className="text-red-400 text-sm">プレイリスト取得失敗</span>
          )}

          {!isPlaylistLoading && !isPlaylistError && (
            <select
              className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1"
              value={selectedPlaylistId}
              onChange={(e) =>
                setSelectedPlaylistId(e.target.value as "all" | string)
              }
            >
              <option value="all">すべて</option>

              {playlists.map((p) => (
                <option key={p.id} value={p.id.toString()}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* ローディング */}
        {isLoading && (
          <div className="text-neutral-500 text-sm">読み込み中...</div>
        )}

        {/* エラー */}
        {isError && (
          <div className="text-red-400 text-sm">ログの取得に失敗しました</div>
        )}

        {/* 草 */}
        {!isLoading && !isError && (
          <div>
            <div className="flex gap-1 p-2 overflow-auto border border-neutral-900 rounded-sm">
              {Array.from({ length: Math.ceil(days.length / 7) }).map(
                (_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {days
                      .slice(weekIndex * 7, weekIndex * 7 + 7)
                      .map((date) => (
                        <div
                          key={date}
                          className={`
                            w-3 h-3 rounded-xs ${getLevel(countMap[date])}
                            ${
                              date === today
                                ? "ring-1 ring-neutral-600 ring-offset-2 ring-offset-neutral-950"
                                : ""
                            }
                          `}
                          title={`${date} : ${countMap[date] ?? 0} logs`}
                        />
                      ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ログ一覧 */}
        <div className="space-y-2">
          {!isLoading && latestLogs.length === 0 && (
            <div className="text-neutral-500 text-sm">ログはまだありません</div>
          )}

          {latestLogs.map((log, i) => (
            <div
              key={i}
              className="p-3 border border-neutral-800 rounded-lg bg-neutral-900"
            >
              <div className="text-xs text-neutral-400">
                {dayjs(log.timestamp).format("YYYY/MM/DD")}
              </div>
              <div className="font-medium text-neutral-100">{log.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
