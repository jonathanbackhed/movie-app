import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { Image } from "expo-image";

interface Props {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  year: string;
  adult: boolean;
  shouldBlur: boolean;
}

export default function PreviewCard({
  id,
  title,
  description,
  image,
  rating,
  year,
  adult,
  shouldBlur,
}: Props) {
  return (
    <Pressable style={tw`flex-row mb-2`} onPress={() => console.log("Pressed", id)}>
      <Image
        source={BASE_IMAGE_URL + "/w92" + image}
        alt="poster"
        contentFit="contain"
        cachePolicy="none"
        style={tw`w-[92px] aspect-2/3 rounded-xl`}
        blurRadius={adult && shouldBlur ? 1 : 0}
      />
      <View style={tw`p-1 pl-2 flex-1`}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={tw`text-xl font-extrabold flex-none`}>
          {title}
        </Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={tw`flex-1`}>
          {description}
        </Text>
        <View style={tw`flex-row flex-none mt-2`}>
          <Text style={tw`mr-2 font-bold text-xs`}>{year ? year.slice(0, 4) : "N/A"}</Text>
          <Text style={tw`mr-2 font-bold text-xs`}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
