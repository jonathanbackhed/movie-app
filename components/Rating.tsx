import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  rating: number;
  customStyle?: string;
  outOfTen?: boolean;
}

export default function Rating({ rating, customStyle, outOfTen }: Props) {
  const hasDecimals = rating % 1 !== 0;
  return (
    <Text style={tw.style(`font-bold text-xs dark:text-white`, customStyle)}>
      {!rating || rating === -1 ? "N/A" : hasDecimals ? rating?.toFixed(1) : rating}
      {outOfTen ? (
        <Text style={tw.style(`text-zinc-500 text-[.5rem] dark:text-neutral-300`, customStyle)}>/10</Text>
      ) : (
        <AntDesign name="star" size={12} color="#ffdf20" />
      )}
    </Text>
  );
}
