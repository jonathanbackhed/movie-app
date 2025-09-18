import { View, Text } from "react-native";
import React, { memo, useCallback } from "react";
import tw from "@/lib/tailwind";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Sharing from "expo-sharing";

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

const PreviewCard = memo(function PreviewCard({
  id,
  title,
  description,
  image,
  rating,
  year,
  type,
  adult,
}: Props) {
  const { setHideAdult } = useSettingsStore();

  const handleHideAdult = () => {
    setHideAdult(true);
  };

  const handleShare = async () => {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync("https://www.themoviedb.org/");
    }
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
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={tw`text-xl font-extrabold flex-none dark:text-white`}>
              {title}
            </Text>
            <Text numberOfLines={3} ellipsizeMode="tail" style={tw`flex-1 dark:text-white`}>
              {description}
            </Text>
            <View style={tw`flex-row flex-none mt-2`}>
              <Text style={tw`mr-2 font-bold text-xs dark:text-white`}>
                {year ? year.slice(0, 4) : "N/A"}
              </Text>
              <Text style={tw`mr-2 font-bold text-xs dark:text-white`}>
                {rating.toFixed(1)}
                <AntDesign name="star" size={12} color="#ffdf20" />
              </Text>
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
});

export default PreviewCard;
