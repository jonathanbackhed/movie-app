import { View, Text, Switch } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface Props {
  text: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  hideBorder?: boolean;
  hideBorderIfOff?: boolean;
}

export default function SettingsRow({
  text,
  value,
  onValueChange,
  hideBorder = false,
  hideBorderIfOff = false,
}: Props) {
  if (hideBorderIfOff && !value) {
    hideBorder = true;
  }

  return (
    <View
      style={tw.style(`flex-row justify-between p-3`, {
        "border-b border-zinc-300 dark:border-zinc-700": !hideBorder,
      })}>
      <Text style={tw`text-lg dark:text-white`}>{text}</Text>
      <Switch onValueChange={onValueChange} value={value} />
    </View>
  );
}
