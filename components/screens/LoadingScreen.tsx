import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";

interface Props {
  message?: string;
  center?: boolean;
}

export default function LoadingScreen({ message = "Loading...", center }: Props) {
  return (
    <SafeAreaView style={tw`flex-1 items-center dark:bg-black ${center ? "justify-center" : ""}`}>
      <Text style={tw`text-xl dark:text-white`}>{message}</Text>
    </SafeAreaView>
  );
}
