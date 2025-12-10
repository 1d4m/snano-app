"use client";

import { playerSelector } from "@/store/slices/player";
import { useBoundStore } from "@/store/store";
import { stopAlarmLoop } from "@/utils/alarm";
import { useShallow } from "zustand/react/shallow";

function PlayerCompleteModal() {
  const { completed, setReset } = useBoundStore(useShallow(playerSelector));

  const handleClick = () => {
    stopAlarmLoop();
    setReset();
  };

  if (!completed) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black">
      <button onClick={handleClick}>stop alarm</button>
    </div>
  );
}

export { PlayerCompleteModal };
