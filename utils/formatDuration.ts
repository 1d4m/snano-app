/**
 * 秒数を "mm:ss" 形式に変換する
 */
const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Math.floor(seconds));

  const minutes = Math.floor(total / 60);
  const remainingSeconds = total % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
};

export { formatDuration };
