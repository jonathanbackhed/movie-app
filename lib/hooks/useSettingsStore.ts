import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface SettingsState {
  hideAdult: boolean;
  setHideAdult: (hideAdult: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hideAdult: false,
      setHideAdult: (hideAdult: boolean) => set({ hideAdult }),
    }),
    {
      name: "settings-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// export function useSettingsStore(key: string) {
//   const { getItem, setItem } = useAsyncStorage(key);
//   const [value, setValue] = useState<string>("");
//   console.log("USESTORAGE RENDERED", value);

//   const readItemFromStorage = async () => {
//     const item = await getItem();
//     setValue(item ?? "");
//   };

//   const writeItemToStorage = async (newValue: string) => {
//     await setItem(newValue);
//     setValue(newValue); // Update local state immediately
//   };

//   useEffect(() => {
//     readItemFromStorage();
//   }, []); // Only run once on mount

//   return { value, writeItemToStorage };
// }
