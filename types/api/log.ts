type LogApiResponse = {
  id: number;
  playlist_id: string;
  title: string;
  timestamp: string;
};

type Log = {
  id: number;
  playlistId: string;
  title: string;
  timestamp: string;
};

export type { LogApiResponse, Log };
