"use client";

import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { useBoundStore } from "@/store";
import { playerSelector } from "@/store/slices/player";
import { stopAlarmLoop } from "@/utils/alarm";
import { formatDuration } from "@/utils/formatDuration";

function PlayerCompleteModal() {
  const { completed, setReset } = useBoundStore(useShallow(playerSelector));

const [restSeconds, setRestSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ 完了したら自動でカウントアップ開始
  useEffect(() => {
    if (!completed) return;

    intervalRef.current = setInterval(() => {
      setRestSeconds((s) => s + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [completed]);

  const handleClick = () => {
    stopAlarmLoop();
    setReset(); // モーダルを閉じるトリガー
    setRestSeconds(0);
  };


  if (!completed) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-lg space-y-4 min-w-60">
        <p className="text-white text-center text-lg font-mono">
          {formatDuration(restSeconds)}
        </p>

        <button
          onClick={handleClick}
          className="w-full bg-emerald-600 py-2 rounded text-black font-bold"
        >
          休憩終了
        </button>
      </div>
    </div>
  );
}

export { PlayerCompleteModal };
