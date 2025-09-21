import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  children: React.ReactNode;
  customStyles?: string;
}

export default function SettingsWrapper({ children, customStyles }: Props) {
  return <View style={tw.style(`bg-zinc-200 dark:bg-zinc-800 rounded-2xl`, customStyles)}>{children}</View>;
}
