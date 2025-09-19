import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";

interface Props {
  message?: string;
}

export default function ErrorScreen({ message = "Failed to load data" }: Props) {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center dark:bg-black`}>
      <Text style={tw`text-xl dark:text-white`}>{message}</Text>
    </SafeAreaView>
  );
}
