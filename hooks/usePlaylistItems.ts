import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

import { PlaylistItemApiRequest } from "@/types/api/playlistItem";
import { PlaylistItem } from "@/types/entities/playlistItem";

const useReadPlaylistItems = (id: string) => {
  return useQuery<PlaylistItem[], Error, PlaylistItem[]>({
    queryKey: ["playlistItems", id],
    queryFn: async () => {
      const response = await fetch(`/api/playlist-items?playlistId=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch playlist items");
      }
      return response.json();
    },
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * プレイリストアイテム作成
 *
 *   TData,     // 成功時に返ってくるデータの型
 *   TError,    // エラー時の型
 *   TVariables,// mutate()/mutationFn に渡す引数の型
 * @returns
 */
const useCreatePlaylistItems = () => {
  const queryClient = useQueryClient();

  return useMutation<PlaylistItem, Error, PlaylistItemApiRequest>({
    mutationFn: async (newItem) => {
      const snakecaseBody = snakecaseKeys(newItem);
      const response = await fetch("/api/playlist-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snakecaseBody),
      });
      if (!response.ok) {
        throw new Error("Failed to create playlist item");
      }
      const data = await response.json();
      return camelcaseKeys(data, { deep: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlistItems"] });
    },
  });
};

/**
 * プレイリストアイテム削除
 * @returns
 */
const useDeletePlaylistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await fetch(`/api/playlist-items?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete playlist item");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlistItems"] });
    },
  });
};

export { useCreatePlaylistItems, useReadPlaylistItems, useDeletePlaylistItem };
