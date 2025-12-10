import { create, StateCreator } from "zustand";
import { createPlayerSlice, PlayerSlice } from "./slices/player";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type SliceCreator<T> = StateCreator<
  T,
  [["zustand/immer", never]],
  [],
  T
>;

type Store = PlayerSlice;

const useBoundStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...createPlayerSlice(...a),
    })),
    {
      name: "app-storage",
      partialize: (state) => ({
        currentItem: state.currentItem,
        isPlaying: state.isPlaying,
        count: state.count,
      }),
    }
  )
);

export { useBoundStore };
