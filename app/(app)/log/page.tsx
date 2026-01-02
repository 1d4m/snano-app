"use client";

import dayjs from "dayjs";
import { useState, useMemo } from "react";

type Playlist = {
  id: string;
  title: string;
};

type Log = {
  playlist_id: string;
  title: string;
  created_at: string;
};

const mockPlaylists: Playlist[] = [
  { id: "1", title: "集中タイマー" },
  { id: "2", title: "勉強ルーティン" },
  { id: "3", title: "朝活タスク" },
];

const mockLogs: Log[] = [
  { playlist_id: "1", title: "ポモドーロ開始", created_at: "2025-01-10" },
  { playlist_id: "1", title: "短い休憩開始", created_at: "2025-01-10" },
  { playlist_id: "2", title: "英語学習開始", created_at: "2025-01-03" },
  { playlist_id: "1", title: "ポモドーロ開始", created_at: "2025-01-01" },
  { playlist_id: "3", title: "朝活開始", created_at: "2024-12-31" },
  { playlist_id: "1", title: "ポモドーロ開始", created_at: "2025-01-10" },
  { playlist_id: "1", title: "短い休憩開始", created_at: "2025-01-10" },
  { playlist_id: "2", title: "英語学習開始", created_at: "2025-01-03" },
  { playlist_id: "1", title: "ポモドーロ開始", created_at: "2025-01-01" },
  { playlist_id: "3", title: "朝活開始", created_at: "2024-12-31" },
];

export default function LogPage() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | "all">(
    "all"
  );

  // 1️⃣ 草の範囲（過去1年）
  const days = useMemo(() => {
    const today = dayjs();
    const start = today.subtract(1, "year").startOf("week");
    const end = today.endOf("week");

    const arr: string[] = [];
    let cursor = start;

    while (cursor.isBefore(end)) {
      arr.push(cursor.format("YYYY-MM-DD"));
      cursor = cursor.add(1, "day");
    }

    return arr;
  }, []);

  // 2️⃣ 選択中プレイリストのログに絞る
  const filteredLogs = useMemo(() => {
    return selectedPlaylistId === "all"
      ? mockLogs
      : mockLogs.filter((l) => l.playlist_id === selectedPlaylistId);
  }, [selectedPlaylistId]);

  // 3️⃣ 日付ごとのカウント
  const countMap = useMemo(() => {
    const map: Record<string, number> = {};
    filteredLogs.forEach((log) => {
      const date = dayjs(log.created_at).format("YYYY-MM-DD");
      map[date] = (map[date] ?? 0) + 1;
    });
    return map;
  }, [filteredLogs]);

  // 4️⃣ 草の色
  const getLevel = (count: number | undefined) => {
    if (!count) return "bg-neutral-900";
    if (count === 1) return "bg-emerald-900";
    if (count === 2) return "bg-emerald-800";
    if (count === 3) return "bg-emerald-700";
    return "bg-emerald-600";
  };

  // 5️⃣ 直近10件
  const latestLogs = useMemo(() => {
    return [...filteredLogs]
      .sort(
        (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
      )
      .slice(0, 10);
  }, [filteredLogs]);

  return (
    <div className="pb-[116px]">
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="font-bold text-sm">ログ</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* プレイリスト選択 */}
        <div>
          <label className="text-sm text-neutral-400 mr-2">プレイリスト</label>
          <select
            className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1"
            value={selectedPlaylistId}
            onChange={(e) =>
              setSelectedPlaylistId(e.target.value as "all" | string)
            }
          >
            <option value="all">すべて</option>
            {mockPlaylists.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* 草 */}
        <div className="flex gap-1 overflow-auto">
          {Array.from({ length: Math.ceil(days.length / 7) }).map(
            (_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((date) => (
                  <div
                    key={date}
                    className={`w-3 h-3 rounded-xs ${getLevel(countMap[date])}`}
                    title={`${date} : ${countMap[date] ?? 0} logs`}
                  />
                ))}
              </div>
            )
          )}
        </div>

        {/* ログ一覧 */}
        <div className="space-y-2">
          {latestLogs.length === 0 && (
            <div className="text-neutral-500 text-sm">ログはまだありません</div>
          )}

          {latestLogs.map((log, i) => (
            <div
              key={i}
              className="p-3 border border-neutral-800 rounded-lg bg-neutral-900"
            >
              <div className="text-xs text-neutral-400">
                {dayjs(log.created_at).format("YYYY/MM/DD")}
              </div>
              <div className="font-medium text-neutral-100">{log.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
