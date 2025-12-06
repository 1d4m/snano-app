import { useMutation, useQuery } from "@tanstack/react-query";

const usePlaylists = () => {
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
  });
};

export { usePlaylists, useCreatePlaylist };
