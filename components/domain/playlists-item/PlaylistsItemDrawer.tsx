"use client";

import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
};

function PlaylistsItemDrawer({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [limitAt, setLimitAt] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
    }
  }, [isOpen]);

  return (
    <Drawer
      title="新規追加"
      isOpen={isOpen}
      submitText="登録する"
      description="プレイリストのタイトルを入力し、登録してください"
      onClose={onClose}
      onSubmit={() => onSubmit({ title, limit_at: limitAt, description })}
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
