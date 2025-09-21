import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { BackdropSize, PosterSize } from "@/constants/enums";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Rating from "./Rating";

interface Props {
  id: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  type: "movie" | "tv";
  rating: number;
  date: string;
}

export default function MediaBigPreview({
  id,
  poster_path,
  backdrop_path,
  title,
  type,
  rating,
  date,
}: Props) {
  const notReleased = new Date(date) > new Date();
  return (
    <Link href={`/media/${id}?type=${type}`} style={tw`w-[300px] h-auto mx-2`}>
      <View style={tw`relative h-44 w-full mb-2`}>
        <Image
          source={BASE_IMAGE_URL + BackdropSize.w780 + backdrop_path}
          alt="backdrop"
          contentFit="cover"
          cachePolicy="none"
          style={tw`h-44 w-full rounded-xl`}
          blurRadius={30}
        />
        <View style={tw`absolute top-0 left-0 w-full h-full items-center justify-center`}>
          <Image
            source={BASE_IMAGE_URL + PosterSize.w342 + poster_path}
            alt="poster"
            contentFit="contain"
            cachePolicy="none"
            style={[tw`w-[92px] aspect-2/3 rounded-xl`]}
          />
        </View>
      </View>
      <View style={tw`w-full flex-row justify-between`}>
        <Text style={tw`font-bold flex-1 dark:text-white`} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Rating rating={rating} />
      </View>
      {notReleased && (
        <View style={tw``}>
          <Text style={tw`text-xs font-bold dark:text-white`}>Release date: {date.split("T")[0]}</Text>
        </View>
      )}
    </Link>
  );
}
