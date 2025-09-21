import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  title: string;
  customStyles?: string;
}

export default function SectionHeader({ title, customStyles }: Props) {
  return <Text style={tw.style(`text-2xl font-bold mb-2 dark:text-white`, customStyles)}>{title}</Text>;
}
