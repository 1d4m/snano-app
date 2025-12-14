"use client";

import { ChevronLeft, Ellipsis, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { PlayingAnimation } from "@/components/domain/player/PlayingAnimation";
import { PlaylistsItemDrawer } from "@/components/domain/playlists-item/PlaylistsItemDrawer";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useDrawer } from "@/hooks/useDrawer";
import {
  useCreatePlaylistItems,
  useDeletePlaylistItem,
  useReadPlaylistItems,
} from "@/hooks/usePlaylistItems";
import { useReadPlaylist } from "@/hooks/usePlaylists";
import { cn } from "@/lib/utils";
import { useBoundStore } from "@/store";
import { toStringParam } from "@/utils/params";

/**
 * プレイリストアイテムページ
 */
export default function Page() {
  const params = useParams();
  const playlistId = toStringParam(params.id);
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const { data: playlistItems = [], isLoading } =
    useReadPlaylistItems(playlistId);
  const { data: playlist, isLoading: playlistLoading } =
    useReadPlaylist(playlistId);

  const { mutate: createPlaylistItem } = useCreatePlaylistItems();
  const { mutate: deletePlaylistItem } = useDeletePlaylistItem();

  const setItem = useBoundStore((state) => state.setItem);
  const isPlaying = useBoundStore((state) => state.isPlaying);
  const item = useBoundStore((state) => state.currentItem);

  // プレイリストアイテム追加処理
  const handleAddPlaylistItem = (item: any) => {
    const newItem = { ...item, playlist_id: params.id, is_completed: false };
    createPlaylistItem(newItem);
  };

  const handleDeletePlaylistItem = (id: number) => {
    deletePlaylistItem(id);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full h-16 px-3">
        <div className="size-10 flex items-center justify-center">
          <Link href="/playlists">
            <ChevronLeft className="size-4.5" />
          </Link>
        </div>
        <h1 className="flex-1 text-center font-bold text-sm">
          {playlistLoading ? "...loading" : playlist.title}
        </h1>
        <div className="size-10"></div>
      </div>
      <div className="px-3">
        <div className="flex items-center gap-x-2 mb-3" onClick={openDrawer}>
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-neutral-800">
            <Plus className="size-4.5 text-neutral-400" />
          </div>
          <span className="text-sm text-neutral-400">新規追加</span>
        </div>
        <div className="space-y-3">
          {playlistItems.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-x-2"
            >

              <div className="flex-1">
                <div className="flex-1 flex items-center gap-x-2" onClick={() => setItem(p)}>
                  <div
                    className="flex items-center justify-center size-10 bg-[#121212] rounded-md"
                  >
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-x-1">
                      {item?.id === p.id && isPlaying && <PlayingAnimation />}
                      <span className={cn("text-sm text-neutral-400", item?.id === p.id && isPlaying && "text-emerald-400")}>{p.title}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="size-6 flex items-center">
                <DropdownMenu
                  trigger={<Ellipsis className="size-5" />}
                  items={[
                    {
                      id: "edit",
                      label: "編集",
                      onClick: () => console.log("編集"),
                    },
                    {
                      id: "delete",
                      label: "削除",
                      danger: true,
                      onClick: () => handleDeletePlaylistItem(p.id),
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PlaylistsItemDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        onSubmit={handleAddPlaylistItem}
      />
    </div>
  );
}
