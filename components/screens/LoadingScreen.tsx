import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  message?: string;
  center?: boolean;
}

export default function LoadingScreen({ message = "Loading...", center }: Props) {
  const { duskMode } = useSettingsStore();
  return (
    <SafeAreaView
      style={tw`flex-1 items-center bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"} ${
        center ? "justify-center" : ""
      }`}
    >
      <Text style={tw`text-xl dark:text-white`}>{message}</Text>
    </SafeAreaView>
  );
}
