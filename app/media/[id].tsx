import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useIsPreview, useLocalSearchParams, useRouter } from "expo-router";
import { useFullMediaDetails } from "@/lib/hooks/useMedia";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { CastMember, CrewMember, Genre, Movie, Provider, Season, TVSeries } from "@/interfaces";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import Credits from "@/components/media/Credits";
import ErrorScreen from "@/components/screens/ErrorScreen";
import Images from "@/components/media/Images";
import Recommended from "@/components/media/Recommended";
import Reviews from "@/components/media/Reviews";
import Providers from "@/components/media/Providers";
import Seasons from "@/components/media/Seasons";
import { formatRuntime } from "@/lib/utils/timeUtils";
import { formatDateShowYearOnly, isUnreleased } from "@/lib/utils/dateUtils";
import CustomScrollView from "@/components/views/CustomScrollView";
import GeneralModal from "@/components/GeneralModal";
import Rating from "@/components/Rating";
import { BackdropSize, PosterSize } from "@/constants/enums";
import TextBubble from "@/components/TextBubble";

export default function MediaDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: "movie" | "tv" }>();
  const router = useRouter();
  const isPreview = useIsPreview();
  const { hideAdult } = useSettingsStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [details, credits, images, recommendations, reviews, providers] = useFullMediaDetails(type, id);

  const media = type === "movie" ? (details?.data as Movie) : (details?.data as TVSeries);
  const mediaMovie = details?.data as Movie;
  const mediaSeries = details?.data as TVSeries;

  const filteredSeasons: Season[] =
    details?.data && "seasons" in details.data && Array.isArray(details.data.seasons)
      ? details.data.seasons.filter((season: Season) => season.name.toLowerCase() !== "specials")
      : [];

  const combinedCredits: (CastMember | CrewMember)[] = [...(credits?.data?.cast || []), ...(credits?.data?.crew || [])];

  const combinedProviders: Provider[] = [
    ...(providers?.data?.results?.US?.flatrate || []),
    // ...(providers?.data?.results?.US?.rent || []),
    // ...(providers?.data?.results?.US?.buy || []),
  ];

  const unreleased = isUnreleased(type === "movie" ? mediaMovie?.release_date : mediaSeries?.first_air_date);

  if (media?.adult && hideAdult && !isPreview) router.back();

  if (details?.isError) {
    return <ErrorScreen message={`Failed to load ${type === "movie" ? "movie" : "show"} details`} />;
  }

  return (
    <CustomScrollView>
      <View style={tw`relative h-80 w-screen mb-2`}>
        <Image
          source={BASE_IMAGE_URL + BackdropSize.w780 + media?.backdrop_path}
          alt="backdrop"
          contentFit="cover"
          cachePolicy="none"
          style={tw`flex-1`}
          blurRadius={30}
        />
        <SafeAreaView edges={["top"]} style={tw`absolute top-0 left-0 w-full h-full items-center justify-center`}>
          <Image
            source={BASE_IMAGE_URL + PosterSize.w342 + media?.poster_path}
            alt="poster"
            contentFit="contain"
            cachePolicy="none"
            style={[tw`w-[154px] aspect-2/3 rounded-xl`]}
          />
        </SafeAreaView>
      </View>
      <View style={tw`mx-2 mb-2 flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-3xl font-bold dark:text-white`}>
            {type === "movie" ? mediaMovie?.title : mediaSeries?.name}
          </Text>
          <View style={tw`flex-row items-center mb-1`}>
            <Text style={tw`font-bold mr-2 dark:text-white`}>
              {type === "movie"
                ? formatDateShowYearOnly(mediaMovie?.release_date || "")
                : formatDateShowYearOnly(mediaSeries?.first_air_date, mediaSeries?.last_air_date)}
            </Text>
            <Rating rating={media?.vote_average} customStyle="mr-2" />
            {type === "movie" ? (
              <Text style={tw`mr-2 font-bold dark:text-white`}>{formatRuntime(mediaMovie?.runtime)}</Text>
            ) : (
              <Text style={tw`mr-2 font-bold dark:text-white`}>
                {mediaSeries?.number_of_seasons > 1
                  ? `${mediaSeries?.number_of_seasons} seasons`
                  : `${mediaSeries?.number_of_seasons} season`}
              </Text>
            )}
          </View>
          {unreleased && (
            <View style={tw`flex-row items-center`}>
              <TextBubble text="UNRELEASED" color="bg-lime-400" />
              <Text style={tw`mr-2 font-bold text-xs dark:text-white`}>
                Releasing {type === "movie" ? mediaMovie?.release_date : mediaSeries?.first_air_date}
              </Text>
            </View>
          )}
        </View>
        {/* <Pressable onPress={() => WebBrowser.openBrowserAsync(`https://www.imdb.com/title/${details?.data?.imdb_id}`)}>
          <FontAwesome name="imdb" size={48} color="#f3ce13" />
        </Pressable> */}
      </View>
      <ScrollView horizontal style={tw`mb-4`} showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row mx-2`}>
          {media?.genres?.map((genre: Genre) => (
            <Text
              key={genre.id}
              style={tw`text-sm font-bold mr-2 bg-zinc-300 dark:bg-zinc-800 dark:text-white rounded-xl px-2 py-1`}>
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
      <Pressable onPress={() => setIsModalOpen(true)} style={tw`flex-row justify-between items-center mx-2 mb-2`}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={tw`flex-1 dark:text-white`}>
          {media?.overview}
        </Text>
        <Entypo name="chevron-right" size={24} style={tw`w-6 dark:text-white`} />
      </Pressable>
      <GeneralModal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)} title="Overview">
        <Text style={tw`dark:text-white`}>{media?.overview}</Text>
      </GeneralModal>

      <Providers data={combinedProviders} />

      {type === "tv" && <Seasons data={filteredSeasons} seriesId={mediaSeries?.id} />}

      <Credits data={combinedCredits} />

      <Reviews data={reviews?.data?.results || []} />

      <Images title="Images" data={images?.data?.backdrops || []} />
      {/* <Images title="Alternate posters" data={images?.data?.posters || []} isPoster /> */}

      <Recommended data={recommendations?.data?.results || []} />

      <Text style={tw`text-center text-xs dark:text-white`}>Providers provided by JustWatch</Text>
    </CustomScrollView>
  );
}
