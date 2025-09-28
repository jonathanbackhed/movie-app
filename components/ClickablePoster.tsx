import { Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { PosterSize } from "@/constants/enums";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

interface Props {
  id: number;
  media_type: string;
  poster_path: string;
}

export default function ClickablePoster({ id, media_type, poster_path }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/media/${id}?type=${media_type}`);
  };

  if (poster_path === "" || media_type === "") return null;

  return (
    <Pressable onPress={handlePress} style={tw`flex-1 p-0.5`}>
      <Image
        source={BASE_IMAGE_URL + PosterSize.w500 + poster_path}
        alt="poster"
        contentFit="contain"
        cachePolicy="memory-disk"
        style={tw`w-full h-auto aspect-2/3 rounded-xl`}
      />
    </Pressable>
  );
}
