"use client";

import { Ellipsis, Plus } from "lucide-react";
import Link from "next/link";

import { PlaylistsDrawer } from "@/components/domain/playlists/PlaylistsDrawer";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useDrawer } from "@/hooks/useDrawer";
import {
  useCreatePlaylist,
  useDeletePlaylist,
  useReadPlaylists,
} from "@/hooks/usePlaylists";

/**
 * プレイリスト一覧ページ
 */
export default function Page() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { data: playlists = [], isLoading } = useReadPlaylists();
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { mutate: deletePlaylist } = useDeletePlaylist();

  // プレイリスト追加処理
  const handleAddPlaylist = (title: string) => {
    createPlaylist({ title });
  };

  // プレイリスト削除処理
  const handleDeletePlaylist = (id: string) => {
    deletePlaylist(id);
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full h-16">
        <h1 className="font-bold text-sm">プレイリスト一覧</h1>
      </div>
      <div className="px-3">
        <div className="flex items-center gap-x-2 mb-3" onClick={openDrawer}>
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-neutral-800">
            <Plus className="size-4.5 text-neutral-400" />
          </div>
          <span className="text-sm text-neutral-400">新規追加</span>
        </div>
        <div className="space-y-3">
          {playlists.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-x-2"
            >
              <div className="flex-1">
                <Link href={`/playlists/${p.id}`}>
                  <div className="flex-1 flex items-center gap-x-2">
                    <div className="w-10 h-10 rounded-md bg-neutral-800"></div>
                    <div className="flex-1 text-sm">{p.title}</div>
                  </div>
                </Link>
              </div>
              <div className="size-6">
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
                      onClick: () => handleDeletePlaylist(p.id),
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PlaylistsDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        onSubmit={handleAddPlaylist}
      />
    </div>
  );
}
