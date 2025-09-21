import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  customStyles?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  children: React.ReactNode;
}

export default function CustomSafeAreaView({ children, customStyles, edges = ["top"] }: Props) {
  const { duskMode } = useSettingsStore();
  return (
    <SafeAreaView
      edges={edges}
      style={tw.style(
        `flex-1 px-2 bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"}`,
        customStyles
      )}>
      {children}
    </SafeAreaView>
  );
}
