"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useBoundStore } from "@/store";
import { playerSelector } from "@/store/slices/player";
import { playAlarmLoop } from "@/utils/alarm";

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

  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(() => {
      setCount(1);
      if (getIsCompleted()) {
        playAlarmLoop();
        stop(); // または stop() でもOK
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [isPlaying, setCount]);

  if (!currentItem) return null;

  return (
    <div className="fixed bottom-16 w-[calc(100%-16px)] h-13 mx-2 bg-[#0A0A0A] border border-[#2b2b2b] rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between gap-x-2 p-2">
        <div className="flex items-center gap-x-2">
          <div className="size-8 rounded bg-[#121212]"></div>
          <div className="text-sm">{currentItem.title}</div>
        </div>
        <div className="flex items-center justify-center pr-2">
          <button onClick={isPlaying ? pause : play}>
            {isPlaying ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </button>
        </div>
      </div>
      <div
        className="h-0.5 bg-[#05DF72] transition-all duration-300"
        style={{ width: `${(count / currentItem.limitAt) * 100}%` }}
      ></div>
    </div>
  );
}

export { Player };
