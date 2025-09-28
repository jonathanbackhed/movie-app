import { Text, View } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: Props) {
  return (
    <View style={tw`flex-row mb-2 justify-between items-center`}>
      <Text style={tw`text-3xl font-bold dark:text-white`}>{title}</Text>
      {children}
    </View>
  );
}
