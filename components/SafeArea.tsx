import tw from "@/lib/tailwind";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  leftright?: boolean;
  styles?: string;
}

export default function SafeArea({ children, leftright = false, styles }: Props) {
  return <SafeAreaView style={tw.style(`pb-[60] ${styles}`, leftright && "px-2")}>{children}</SafeAreaView>;
}
