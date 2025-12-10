import { PlaylistItem } from "@/types/playlistItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

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

const useCreatePlaylistItems = () => {
  return useMutation({
    mutationFn: async (newItem) => {
      const response = await fetch("/api/playlist-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error("Failed to create playlist item");
      }
      return response.json();
    },
  });
};

export { useCreatePlaylistItems, useReadPlaylistItems };
