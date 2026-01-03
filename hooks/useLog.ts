import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

import { Log, LogApiResponse } from "@/types/api/log";

/**
 * ログ取得（最新10件）
 */
export const useReadLogs = (playlistId?: string) => {
  return useQuery<LogApiResponse[], Error, Log[]>({
    queryKey: ["logs", playlistId ?? "all"],
    queryFn: async () => {
      const url = playlistId
        ? `/api/logs?playlistId=${playlistId}`
        : `/api/logs`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch logs");

      return res.json();
    },
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

type CreateLogInput = {
  playlistId: string;
  title: string;
  timestamp: string; // ISO形式
};

/**
 * ログ登録
 */
export const useCreateLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: CreateLogInput) => {
      const res = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(log),
      });

      if (!res.ok) throw new Error("Failed to create log");

      return res.json();
    },

    onSuccess: (data: LogApiResponse) => {
      // ① 全ログも invalidate
      queryClient.invalidateQueries({ queryKey: ["logs", "all"] });

      // ② playlistId ごとのキャッシュも invalidate
      queryClient.invalidateQueries({
        queryKey: ["logs", data.playlist_id],
      });
    },
  });
};
