import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return <Text style={tw`text-3xl font-bold mb-2`}>{title}</Text>;
}
