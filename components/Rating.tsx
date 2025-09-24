import { Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  rating?: number;
  customStyle?: string;
  outOfTen?: boolean;
}

export default function Rating({ rating, customStyle, outOfTen }: Props) {
  if (!rating || rating === -1) return null;
  const roundedRating = Math.round(rating * 10) / 10;
  return (
    <Text style={tw.style(`font-bold text-xs dark:text-white`, customStyle)}>
      {roundedRating}
      {outOfTen ? (
        <Text style={tw.style(`text-zinc-500 text-[.5rem] dark:text-neutral-300`, customStyle)}>/10</Text>
      ) : (
        <AntDesign name="star" size={12} color="#ffdf20" />
      )}
    </Text>
  );
}
