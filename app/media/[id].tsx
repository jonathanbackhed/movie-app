import { View, Text, ScrollView, Modal, Button, Pressable } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useIsPreview, useLocalSearchParams, useRouter } from "expo-router";
import { useFullMediaDetails } from "@/lib/hooks/useMedia";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { IGenre } from "@/interfaces/movies/IMovie";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Credits from "@/components/media/Credits";
import ErrorScreen from "@/components/screens/ErrorScreen";
import Images from "@/components/media/Images";

export default function MediaDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: "movie" | "tv" }>();
  const router = useRouter();
  const isPreview = useIsPreview();
  const { hideAdult } = useSettingsStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [details, credits, images] = useFullMediaDetails(type, id);

  const combinedCredits = [...(credits?.data?.cast || []), ...(credits?.data?.crew || [])];

  if (details?.data?.adult && hideAdult && !isPreview) router.back();

  if (details?.isError) {
    return <ErrorScreen message={`Failed to load ${type === "movie" ? "movie" : "show"} details`} />;
  }

  return (
    <ScrollView style={tw`flex-1`}>
      <View style={tw`relative h-80 w-screen`}>
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
          <Text style={tw`text-3xl font-bold`}>{details?.data?.title || details?.data?.name}</Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-bold mr-2`}>
              {details?.data?.release_date?.slice(0, 4) ||
                `${details?.data?.first_air_date?.slice(0, 4)} - ${details?.data?.last_air_date?.slice(
                  0,
                  4
                )}` ||
                "N/A"}
            </Text>
            <Text style={tw`font-bold`}>{details?.data?.vote_average?.toFixed(1) || "N/A"}</Text>
            {/* <Text style={tw`mr-2 text-zinc-500 text-xs`}>/10</Text> */}
            <Text style={tw`mr-2`}>
              <AntDesign name="star" size={12} color="black" />
            </Text>
            <Text style={tw`mr-2 font-bold`}>
              {details?.data?.runtime &&
                `${Math.floor(details?.data.runtime / 60)}h ${Math.floor(details?.data.runtime % 60)}m`}
            </Text>
          </View>
        </View>
        {/* <Pressable onPress={() => WebBrowser.openBrowserAsync(`https://www.imdb.com/title/${details?.data?.imdb_id}`)}>
          <FontAwesome name="imdb" size={48} color="#f3ce13" />
        </Pressable> */}
      </View>
      <ScrollView horizontal style={tw`mb-2`}>
        <View style={tw`flex-row mx-2`}>
          {details?.data?.genres?.map((genre: IGenre) => (
            <Text key={genre.id} style={tw`text-sm font-bold mr-2 bg-zinc-300 rounded-xl px-2 py-1`}>
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        style={tw`flex-row justify-between items-center mx-2 mb-2`}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={tw`flex-1`}>
          {details?.data?.overview}
        </Text>
        <Entypo name="chevron-right" size={24} style={tw`w-6`} />
      </Pressable>
      <Modal
        animationType="slide"
        allowSwipeDismissal
        visible={isModalOpen}
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalOpen(false)}>
        <View style={tw`flex-1 p-6`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-3xl font-bold mb-2`}>Overview</Text>
            <Button title="Close" onPress={() => setIsModalOpen(false)} />
          </View>
          <Text>{details?.data?.overview}</Text>
        </View>
      </Modal>

      <Credits data={combinedCredits} />

      <Images title="Backdrops" data={images?.data?.backdrops || []} />
      <Images title="Alternate posters" data={images?.data?.posters || []} isPoster />
    </ScrollView>
  );
}
