import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/lib/tailwind";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMediaDetails } from "@/lib/hooks/useMedia";
import { useIsFocused } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { IGenre } from "@/interfaces/movies/IMovie";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";

export default function MediaDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: "movie" | "tv" }>();
  const isFocused = useIsFocused();
  const { getItem } = useAsyncStorage("hideAdult");
  const router = useRouter();

  const [hideAdult, setHideAdult] = useState<boolean>(false);

  const { data, isLoading, isError } = useMediaDetails(type, id);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setHideAdult(item === "y" ? true : false);
  };

  if (data?.adult && hideAdult) router.back();

  useEffect(() => {
    if (isFocused) readItemFromStorage();
  }, [isFocused]);

  return (
    <ScrollView style={tw`flex-1 bg-blue-400`}>
      <View style={tw`relative`}>
        <Image
          source={BASE_IMAGE_URL + "/w780" + data?.backdrop_path}
          alt="backdrop"
          contentFit="cover"
          cachePolicy="none"
          style={tw`h-80`}
          blurRadius={30}
        />
        <Image
          source={BASE_IMAGE_URL + "/w154" + data?.poster_path}
          alt="poster"
          contentFit="contain"
          cachePolicy="none"
          style={[tw`w-[154px] aspect-2/3 rounded-xl absolute top-[70px] left-1/2 -translate-x-[77px]`]}
        />
      </View>
      {/* <View style={tw`bg-black/30 h-80 w-screen absolute top-0 left-0`}></View> */}
      <View style={tw`mx-2 mb-2 flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-3xl font-bold`}>{data?.title || data?.name}</Text>
          <Text style={tw`font-bold`}>
            {data?.release_date?.slice(0, 4) ||
              `${data?.first_air_date?.slice(0, 4)} - ${data?.last_air_date?.slice(0, 4)}` ||
              "N/A"}
          </Text>
          <Text style={tw`mr-2 font-bold`}>{data?.vote_average?.toFixed(1) || "N/A"}</Text>
        </View>
        <Pressable onPress={() => WebBrowser.openBrowserAsync(`https://www.imdb.com/title/${data?.imdb_id}`)}>
          <FontAwesome name="imdb" size={48} color="#f3ce13" />
        </Pressable>
      </View>

      <ScrollView horizontal>
        <View style={tw`flex-row mx-2`}>
          {data?.genres?.map((genre: IGenre) => (
            <Text key={genre.id} style={tw`text-sm font-bold mr-2 bg-zinc-300 rounded-xl px-2 py-1`}>
              {genre.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
