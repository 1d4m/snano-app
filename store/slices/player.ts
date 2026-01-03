import { SliceCreator } from "@/store";
import { PlaylistItem } from "@/types/entities/playlistItem";

/**
 * 状態セット（set）

setCurrentItem(item: PlaylistItem)

setIsPlaying(value: boolean)

setCount(value: number)

setCompleted(value: boolean)

✔ 状態取得（get）

getCurrentItem()

getIsPlaying()

getCount()

getIsCompleted()

✔ アクション（ドメイン操作）

play()

pause()

stop()

tick()（incrementCount を改名するなら）
 */

type State = {
  currentItem: PlaylistItem | null; // 現在再生中のアイテム
  isPlaying: boolean; // 再生中かどうか
  count: number; // 経過時間（秒）
  completed: boolean; // 再生完了したかどうか
};

type Action = {
  // setters
  setItem: (item: PlaylistItem) => void;
  setCompleted: (value: boolean) => void;
  setCount: (value: number) => void;
  setReset: () => void;

  // domain actions
  play: () => void;
  pause: () => void;
  stop: () => void;
};

type Selector = {
  getCurrentItem: () => PlaylistItem | null;
  getIsCompleted: () => boolean;
  // 再生中かどうか
  //
};

export type PlayerSlice = State & Action & Selector;

const initialState: State = {
  currentItem: null,
  isPlaying: false,
  count: 0,
  completed: false,
};

export const createPlayerSlice: SliceCreator<PlayerSlice> = (set, get) => ({
  ...initialState,
  // setters→getters→domain actionsの順で定義

  // setters
  setItem: (item) =>
    set((state) => {
      state.currentItem = item;
      state.isPlaying = false;
      state.count = 0;
      state.completed = false;
    }),

  setCompleted: (value: boolean) =>
    set((state) => {
      state.completed = value;
    }),

  setCount: (value: number) =>
    set((state) => {
      state.count = state.count + value;
      const item = state.currentItem;
      state.completed = item ? state.count >= item.limitAt : false;
    }),

  setReset: () =>
    set((state) => {
      state.count = 0;
      state.completed = false;
    }),

  // getters
  getCurrentItem: () => get().currentItem,

  getIsCompleted: () => {
    const item = get().currentItem;
    if (!item) return false;
    return get().count >= item.limitAt;
  },

  // domain actions
  play: () => {
    if (!get().currentItem) return;
    set((state) => {
      state.isPlaying = true;
    });
  },

  pause: () =>
    set((state) => {
      state.isPlaying = false;
    }),

  stop: () =>
    set((state) => {
      state.isPlaying = false;
      state.count = 0;
      // state.completed = false;
    }),
});

// TODO: selectorsの実装
export const playerSelector = (s: PlayerSlice) => ({
  currentItem: s.currentItem,
  isPlaying: s.isPlaying,
  count: s.count,
  completed: s.completed,
  setCount: s.setCount,
  setReset: s.setReset,
  getIsCompleted: s.getIsCompleted,
  play: s.play,
  pause: s.pause,
  stop: s.stop,
});
