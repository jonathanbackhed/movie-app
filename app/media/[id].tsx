import { View, Text, ScrollView, Modal, Button, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useIsPreview, useLocalSearchParams, useRouter } from "expo-router";
import { useFullMediaDetails } from "@/lib/hooks/useMedia";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { Genre } from "@/interfaces/index";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Credits from "@/components/media/Credits";
import ErrorScreen from "@/components/screens/ErrorScreen";
import Images from "@/components/media/Images";
import Recommended from "@/components/media/Recommended";
import Reviews from "@/components/media/Reviews";
import Providers from "@/components/media/Providers";
import Seasons from "@/components/media/Seasons";
import { formatRuntime } from "@/lib/utils/formatRuntime";
import { formatDateShowYearOnly } from "@/lib/utils/formatDate";
import CustomScrollView from "@/components/views/CustomScrollView";
import GeneralModal from "@/components/GeneralModal";
import Rating from "@/components/Rating";

export default function MediaDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: "movie" | "tv" }>();
  const router = useRouter();
  const isPreview = useIsPreview();
  const { hideAdult } = useSettingsStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [details, credits, images, recommendations, reviews, providers] = useFullMediaDetails(type, id);

  const filteredSeasons =
    details?.data?.seasons?.filter((season: any) => season.name.toLowerCase() !== "specials") || [];

  const combinedCredits = [...(credits?.data?.cast || []), ...(credits?.data?.crew || [])];

  const combinedProviders = [
    ...(providers?.data?.results?.US?.flatrate || []),
    // ...(providers?.data?.results?.US?.rent || []),
    // ...(providers?.data?.results?.US?.buy || []),
  ];

  if (details?.data?.adult && hideAdult && !isPreview) router.back();

  if (details?.isError) {
    return <ErrorScreen message={`Failed to load ${type === "movie" ? "movie" : "show"} details`} />;
  }

  return (
    <CustomScrollView>
      <View style={tw`relative h-80 w-screen mb-2`}>
        <Image
          source={BASE_IMAGE_URL + "/w780" + details?.data?.backdrop_path}
          alt="backdrop"
          contentFit="cover"
          cachePolicy="none"
          style={tw`flex-1`}
          blurRadius={30}
        />
        <SafeAreaView
          edges={["top"]}
          style={tw`absolute top-0 left-0 w-full h-full items-center justify-center`}>
          <Image
            source={BASE_IMAGE_URL + "/w342" + details?.data?.poster_path}
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
            {details?.data?.title || details?.data?.name}
          </Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-bold mr-2 dark:text-white`}>
              {details?.data?.release_date
                ? formatDateShowYearOnly(details?.data?.release_date)
                : formatDateShowYearOnly(details?.data?.first_air_date, details?.data?.last_air_date)}
            </Text>
            <Rating rating={details?.data?.vote_average} customStyle="mr-2" />
            {details?.data?.runtime ? (
              <Text style={tw`mr-2 font-bold dark:text-white`}>{formatRuntime(details?.data?.runtime)}</Text>
            ) : (
              <Text style={tw`mr-2 font-bold dark:text-white`}>
                {details?.data?.number_of_seasons > 1
                  ? `${details?.data?.number_of_seasons} seasons`
                  : `${details?.data?.number_of_seasons} season`}
              </Text>
            )}
          </View>
        </View>
        {/* <Pressable onPress={() => WebBrowser.openBrowserAsync(`https://www.imdb.com/title/${details?.data?.imdb_id}`)}>
          <FontAwesome name="imdb" size={48} color="#f3ce13" />
        </Pressable> */}
      </View>
      <ScrollView horizontal style={tw`mb-4`}>
        <View style={tw`flex-row mx-2`}>
          {details?.data?.genres?.map((genre: Genre) => (
            <Text
              key={genre.id}
              style={tw`text-sm font-bold mr-2 bg-zinc-300 dark:bg-zinc-800 dark:text-white rounded-xl px-2 py-1`}>
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        style={tw`flex-row justify-between items-center mx-2 mb-2`}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={tw`flex-1 dark:text-white`}>
          {details?.data?.overview}
        </Text>
        <Entypo name="chevron-right" size={24} style={tw`w-6 dark:text-white`} />
      </Pressable>
      <GeneralModal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)} title="Overview">
        <Text style={tw`dark:text-white`}>{details?.data?.overview}</Text>
      </GeneralModal>

      <Providers data={combinedProviders} />

      {details?.data?.seasons && <Seasons data={filteredSeasons} seriesId={details?.data?.id} />}

      <Credits data={combinedCredits} />

      <Reviews data={reviews?.data?.results || []} />

      <Images title="Images" data={images?.data?.backdrops || []} />
      {/* <Images title="Alternate posters" data={images?.data?.posters || []} isPoster /> */}

      <Recommended data={recommendations?.data?.results || []} />

      <Text style={tw`text-center text-xs dark:text-white`}>Providers provided by JustWatch</Text>
    </CustomScrollView>
  );
}
