import { ScrollView } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  children: React.ReactNode;
  customStyles?: string;
  paddingBottom?: number;
  paddingHorizontal?: boolean;
}

export default function CustomScrollView({
  children,
  customStyles,
  paddingBottom = 20,
  paddingHorizontal = false,
}: Props) {
  const { duskMode } = useSettingsStore();
  return (
    <ScrollView
      style={tw.style(
        `flex-1 bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"}`,
        { "px-2": paddingHorizontal },
        customStyles
      )}
      contentContainerStyle={{ paddingBottom: paddingBottom }}>
      {children}
    </ScrollView>
  );
}
