import { useRef } from "react";

/**
 * アラーム再生用のカスタムフック
 * @returns
 */
const useAlarm = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlarm = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/alarm.mp3");
    }

    const audio = audioRef.current;

    audio.currentTime = 0;
    audio.play();
  };

  return { playAlarm };
};

export { useAlarm };
