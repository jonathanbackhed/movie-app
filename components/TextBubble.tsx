import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  text: string;
  color: string;
}

export default function TextBubble({ text, color }: Props) {
  return <Text style={tw`text-xs font-bold mr-2 ${color} rounded-xl px-2 py-1 grow-0`}>{text}</Text>;
}
