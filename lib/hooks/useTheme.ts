import { useEffect } from "react";
import { Appearance } from "react-native";
import { useAppColorScheme } from "twrnc";
import { useSettingsStore } from "./useSettingsStore";
import tw from "@/lib/tailwind";

export function useTheme() {
  const [, , setColorScheme] = useAppColorScheme(tw);

  const { darkMode, followDevice } = useSettingsStore();
  const systemColorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if (darkMode && followDevice) {
      setColorScheme(systemColorScheme);
      Appearance.setColorScheme(null);
    } else if (darkMode && !followDevice) {
      setColorScheme("dark");
      Appearance.setColorScheme("dark");
    } else {
      setColorScheme("light");
      Appearance.setColorScheme("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, followDevice, systemColorScheme]);
}
