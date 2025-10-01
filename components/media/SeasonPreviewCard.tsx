import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { PosterSize } from "@/constants/enums";
import Entypo from "@expo/vector-icons/Entypo";
import { useSeasonEpisodes } from "@/lib/hooks/useMedia";
import LoadingScreen from "../screens/LoadingScreen";
import ErrorScreen from "../screens/ErrorScreen";
import { formatRuntime } from "@/lib/utils/timeUtils";
import GeneralModal from "../GeneralModal";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import Rating from "../Rating";
import { EpisodeFull } from "@/interfaces";

interface Props {
  seriesId: number;
  path: string;
  name: string;
  rating: number;
  overview: string;
  date: string;
  season_number: number;
  episode_count: number;
}

export default function SeasonPreviewCard({
  seriesId,
  path,
  name,
  rating,
  overview,
  date,
  season_number,
  episode_count,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { duskMode } = useSettingsStore();

  const { data: episodesData, isLoading, error } = useSeasonEpisodes(seriesId, season_number, isModalOpen);

  return (
    <>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        style={tw`w-[300px] h-auto mx-2 bg-white rounded-xl p-2 shadow-sm flex-row ${
          duskMode ? "dark:bg-zinc-800" : "dark:bg-zinc-900"
        }`}>
        <Image
          source={BASE_IMAGE_URL + PosterSize.w154 + path}
          alt="poster art"
          style={tw`w-[69px] aspect-2/3 rounded-xl mr-2`}
          cachePolicy="none"
          contentFit="contain"
        />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between`}>
            <View>
              <Text style={tw`font-bold dark:text-white`}>{name}</Text>
              <Text style={tw`text-xs dark:text-white`}>
                {episode_count > 1 ? `${episode_count} episodes` : `${episode_count} episode`}
              </Text>
            </View>
            <Rating rating={rating} />
          </View>
          <View style={tw`flex-1 flex-row items-center`}>
            <Text style={tw`text-xs flex-1 dark:text-white`} numberOfLines={3} ellipsizeMode="tail">
              {overview}
            </Text>
            <Entypo name="chevron-right" size={24} style={tw`w-6 dark:text-white`} />
          </View>
          <View>
            <Text style={tw`text-xs dark:text-white`}>{date.split("-")[0]}</Text>
          </View>
        </View>
      </Pressable>
      <GeneralModal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)} title={name}>
        <ScrollView>
          <View style={tw`flex-row items-center mb-1 justify-between`}>
            <Image
              source={BASE_IMAGE_URL + PosterSize.w92 + path}
              alt="image"
              style={tw`w-[46px] aspect-2/3 rounded-xl mr-1`}
              cachePolicy="none"
              contentFit="contain"
            />
            <View style={tw`flex items-end`}>
              <Rating rating={rating} />
              <Text style={tw`text-xs dark:text-white`}>{date.split("T")[0]}</Text>
            </View>
          </View>
          <Text style={tw`mb-2 dark:text-white`}>{overview}</Text>

          <View style={tw`mb-10`}>
            <Text style={tw`text-3xl font-bold mb-2 dark:text-white`}>Episodes</Text>

            {isLoading && <LoadingScreen message="Loading episodes..." />}

            {error && <ErrorScreen message="Failed to load episodes" />}

            {episodesData?.episodes?.map((episode: EpisodeFull) => (
              <View
                key={episode?.id}
                style={tw`mb-2 p-2 bg-white rounded-xl ${duskMode ? "dark:bg-zinc-800" : "dark:bg-zinc-900"}`}>
                <View style={tw`flex-row justify-between items-start mb-2`}>
                  <View style={tw`flex-1`}>
                    <Text style={tw`font-bold text-lg dark:text-white`}>
                      {episode?.episode_number}. {episode?.name}
                    </Text>
                    <Text style={tw`text-sm text-gray-600 dark:text-white`}>
                      {episode?.air_date && new Date(episode?.air_date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Rating rating={episode?.vote_average} />
                </View>
                <Text style={tw`text-sm dark:text-white`} numberOfLines={3}>
                  {episode?.overview || "No overview available"}
                </Text>
                {episode?.runtime && (
                  <Text style={tw`text-xs text-gray-500 mt-1 dark:text-white`}>{formatRuntime(episode?.runtime)}</Text>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </GeneralModal>
    </>
  );
}
