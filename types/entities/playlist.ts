import { PlaylistApiResponse } from "../api/player";
import { Camelize } from "../utils/convertKeys";

type Playlist = Camelize<PlaylistApiResponse>;

export type { Playlist };