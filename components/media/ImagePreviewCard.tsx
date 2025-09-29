import { View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import tw from "@/lib/tailwind";
import { BackdropSize, PosterSize } from "@/constants/enums";
import { Link } from "expo-router";

interface Props {
  id?: number;
  path: string | null;
  isPoster?: boolean;
  type?: "movie" | "tv";
}

export default function ImagePreviewCard({ id, path, isPoster, type }: Props) {
  if (!path) return null;
  return id ? (
    <Link href={`/media/${id}?type=${type}`} style={tw`w-[92px] aspect-2/3 mx-2`}>
      <Image
        source={BASE_IMAGE_URL + PosterSize.w342 + path}
        alt="image"
        style={tw`w-full h-full rounded-xl`}
        cachePolicy="none"
        contentFit="contain"
      />
    </Link>
  ) : (
    <View style={tw`${isPoster ? "w-[92px] aspect-2/3" : "w-[300px] aspect-video"} mx-2`}>
      <Image
        source={BASE_IMAGE_URL + (isPoster ? PosterSize.w342 : BackdropSize.w780) + path}
        alt="image"
        style={tw`w-full h-full rounded-xl`}
        cachePolicy="none"
        contentFit="contain"
      />
    </View>
  );
}
