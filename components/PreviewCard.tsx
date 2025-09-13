import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  year: string;
  type: "movie" | "tv";
  adult: boolean;
}

export default function PreviewCard({ id, title, description, image, rating, year, type, adult }: Props) {
  const { setHideAdult } = useSettingsStore();

  const handleHideAdult = () => {
    setHideAdult(true);
  };

  const handleShare = () => {
    console.log("share");
  };

  return (
    <Link href={`/media/${id}?type=${type}`} style={tw`flex-row mb-2`}>
      <Link.Trigger>
        <View style={tw`flex-row mb-2`}>
          <Image
            source={BASE_IMAGE_URL + "/w92" + image}
            alt="poster"
            contentFit="contain"
            cachePolicy="none"
            style={tw`w-[92px] h-[138px] aspect-2/3 rounded-xl`}
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
        </View>
      </Link.Trigger>
      <Link.Preview />
      {adult ? (
        <Link.Menu>
          <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleShare} />
          <Link.MenuAction title="Hide adult content" icon="minus.circle" onPress={handleHideAdult} />
        </Link.Menu>
      ) : (
        <Link.Menu>
          <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleShare} />
        </Link.Menu>
      )}
    </Link>
  );
}
