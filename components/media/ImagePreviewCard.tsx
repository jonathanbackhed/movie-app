import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import tw from "@/lib/tailwind";
import { BackdropSize, PosterSize } from "@/constants/enums";

interface Props {
  file_path: string;
  isPoster?: boolean;
}

export default function ImagePreviewCard({ file_path, isPoster }: Props) {
  return (
    <View style={tw`${isPoster ? "w-[92px] aspect-2/3" : "w-[300px] aspect-video"} mx-2`}>
      <Image
        source={BASE_IMAGE_URL + (isPoster ? PosterSize.w154 : BackdropSize.w780) + file_path}
        alt="image"
        style={tw`w-full h-full rounded-xl`}
        cachePolicy="none"
        contentFit="contain"
      />
    </View>
  );
}
