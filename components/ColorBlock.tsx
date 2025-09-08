import tw from "@/lib/tailwind";
import React from "react";
import { View } from "react-native";

interface Props {
  twColor: string;
}

export default function ColorBlock({ twColor }: Props) {
  return <View style={tw`p-12 rounded-xl ${twColor}`} />;
}
