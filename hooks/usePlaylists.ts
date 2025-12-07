import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useReadPlaylists = () => {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await fetch("/api/playlists");
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      return response.json();
    },
  });
};

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
 * 🔥 プレイリスト削除
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

export { useReadPlaylists, useCreatePlaylist, useDeletePlaylist };
