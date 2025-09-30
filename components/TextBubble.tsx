import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  text: string;
  color?: string;
  textSize?: "xs" | "sm";
  customStyle?: string;
}

export default function TextBubble({
  text,
  color = "bg-zinc-200 dark:bg-zinc-800 dark:text-white",
  textSize = "xs",
  customStyle = "",
}: Props) {
  return (
    <Text
      style={tw`${
        textSize === "xs" ? "text-xs" : "text-sm"
      } font-bold mr-2 ${color} rounded-xl px-2 py-1 ${customStyle}`}>
      {text}
    </Text>
  );
}
