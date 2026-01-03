"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useAlarm } from "@/hooks/useAlarm";
import { useBoundStore } from "@/store";
import { playerSelector } from "@/store/slices/player";

function Player() {
  const {
    currentItem,
    isPlaying,
    count,
    setCount,
    getIsCompleted,
    play,
    pause,
    stop,
  } = useBoundStore(useShallow(playerSelector));
  const { playAlarm } = useAlarm();

  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setCount(1);
      if (getIsCompleted()) {
        playAlarm();
        stop(); // または stop() でもOK
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [isPlaying, setCount]);

  if (!currentItem) return null;

  return (
    <div className="fixed bottom-16 max-w-xl w-[calc(100%-16px)] h-13 mx-2 bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between gap-x-2 p-2">
        <div className="flex items-center gap-x-2">
          <div className="size-8 rounded-sm bg-[#121212] flex items-center justify-center">
            <p className="text-xs">🎷</p>
          </div>
          <div className="text-sm">{currentItem.title}</div>
        </div>
        <div className="flex items-center justify-center pr-2">
          <button onClick={isPlaying ? pause : play}>
            {isPlaying ? (
              <Pause className="size-5 fill-current stroke-none text-neutral-200" />
            ) : (
              <Play className="size-5 fill-current stroke-none text-neutral-200" />
            )}
          </button>
        </div>
      </div>
      <div
        className="h-0.5 bg-emerald-400 transition-all duration-300"
        style={{ width: `${(count / currentItem.limitAt) * 100}%` }}
      ></div>
    </div>
  );
}

export { Player };
