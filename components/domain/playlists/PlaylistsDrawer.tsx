"use client";

import { Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

function PlaylistsDrawer({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");

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
      onSubmit={() => onSubmit(title)}
    >
      <Input
        value={title}
        placeholder="タイトルを入力"
        onChange={(e) => setTitle(e.target.value)}
      />
    </Drawer>
  );
}

export { PlaylistsDrawer };
