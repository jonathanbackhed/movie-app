import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export type WatchlistItem = {
  id: number;
  poster_path: string;
  media_type: "movie" | "tv";
};

interface WatchlistState {
  watchlist: WatchlistItem[] | [];
  add: (watchlistItem: WatchlistItem) => void;
  remove: (id: number) => void;
  hasItem: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchlist: [],
      add: (watchlistItem: WatchlistItem) =>
        set((state) => ({
          watchlist: [...state.watchlist, watchlistItem],
        })),
      remove: (id: number) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        })),
      hasItem: (id: number): boolean => {
        const state = useWatchlistStore.getState();
        return state.watchlist.some((item) => item.id === id);
      },
    }),
    {
      name: "watchlist-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
