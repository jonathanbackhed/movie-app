import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface SettingsState {
  hideAdult: boolean;
  setHideAdult: (hideAdult: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  followDevice: boolean;
  setFollowDevice: (followDevice: boolean) => void;
  duskMode: boolean;
  setDuskMode: (duskMode: boolean) => void;
  useOldTabBar: boolean;
  setUseOldTabBar: (useOldTabBar: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hideAdult: false,
      setHideAdult: (hideAdult: boolean) => set({ hideAdult }),
      darkMode: false,
      setDarkMode: (darkMode: boolean) => set({ darkMode }),
      followDevice: true,
      setFollowDevice: (followDevice: boolean) => set({ followDevice }),
      duskMode: false,
      setDuskMode: (duskMode: boolean) => set({ duskMode }),
      useOldTabBar: false,
      setUseOldTabBar: (useOldTabBar: boolean) => set({ useOldTabBar }),
    }),
    {
      name: "settings-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
