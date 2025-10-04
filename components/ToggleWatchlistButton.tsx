import { Pressable } from "react-native";
import React from "react";
import { useWatchlistStore } from "@/lib/hooks/useWatchlistStore";
import tw from "@/lib/tailwind";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  id: number;
  poster_path: string;
  media_type: "movie" | "tv";
}

export default function ToggleWatchlistButton({ id, poster_path, media_type }: Props) {
  const { add, remove, hasItem } = useWatchlistStore();
  const { darkMode } = useSettingsStore();
  return (
    <Pressable onPress={() => (hasItem(id) ? remove(id) : add({ id, poster_path, media_type }))} style={tw`p-1`}>
      <AntDesign
        name="check-circle"
        size={24}
        color="black"
        style={tw`rounded-full ${hasItem(id) ? "text-green-500" : darkMode ? "text-white" : ""}`}
      />
    </Pressable>
  );
}
