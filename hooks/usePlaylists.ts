import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

import { PlaylistApiResponse } from "@/types/api/player";
import { Playlist } from "@/types/entities/playlist";

/**
 * useQuery<
  TQueryFnData, // queryFn が返す型
  TError,       // エラー型
  TData         // select 後の型
> {
}


/**
 * プレイリスト一覧取得
 * @returns
 */
const useReadPlaylists = () => {
  return useQuery<PlaylistApiResponse[], Error, PlaylistApiResponse[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await fetch("/api/playlists");
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      return response.json();
    },
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * プレイリスト取得
 * @param id
 * @returns
 */
const useReadPlaylist = (id: string | number) => {
  return useQuery<PlaylistApiResponse, Error, Playlist>({
    queryKey: ["playlists", id],
    queryFn: async () => {
      const response = await fetch(`/api/playlists/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch playlist");
      }
      return response.json();
    },
    select: (data) => camelcaseKeys(data, { deep: true }),
  });
};

/**
 * プレイリスト作成
 * @returns
 */
const useCreatePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPlaylist: { title: string }) => {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlaylist),
      });
      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};

/**
 * プレイリスト削除
 * @returns
 */
const useDeletePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      console.log(id);
      const response = await fetch(`/api/playlists/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }
      return true;
    },
    // 削除後に一覧を再読み込み
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });
};

export {
  useReadPlaylists,
  useCreatePlaylist,
  useDeletePlaylist,
  useReadPlaylist,
};
