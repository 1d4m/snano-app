"use client";

import { useState } from "react";

import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlaylistItem } from "@/types/entities/playlistItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    item: Omit<PlaylistItem, "id" | "playlistId" | "isCompleted">
  ) => void;
};

function PlaylistsItemDrawer({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [limitAt, setLimitAt] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <Drawer
      title="新規追加"
      isOpen={isOpen}
      submitText="登録する"
      description="プレイリストのタイトルを入力し、登録してください"
      onClose={onClose}
      onSubmit={() => onSubmit({ title, limitAt: limitAt * 60, description })}
    >
      <Input
        value={title}
        placeholder="タイトルを入力"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        value={limitAt}
        type="number"
        placeholder="タイトルを入力"
        onChange={(e) => setLimitAt(Number(e.target.value))}
      />
      <Textarea
        value={description}
        placeholder="説明を入力"
        onChange={(e) => setDescription(e.target.value)}
      />
    </Drawer>
  );
}

export { PlaylistsItemDrawer };
