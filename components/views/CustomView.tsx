import { View } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  customStyles?: string;
  children: React.ReactNode;
}

export default function CustomView({ children, customStyles }: Props) {
  const { duskMode } = useSettingsStore();
  return (
    <View
      style={tw.style(
        `flex-1 px-2 bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"}`,
        customStyles
      )}>
      {children}
    </View>
  );
}
