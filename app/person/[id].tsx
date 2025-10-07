import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { usePersonDetails } from "@/lib/hooks/usePerson";
import ErrorScreen from "@/components/screens/ErrorScreen";
import CustomScrollView from "@/components/views/CustomScrollView";
import { Image } from "expo-image";
import tw from "@/lib/tailwind";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDateFancy, getAge } from "@/lib/utils/dateUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import GeneralModal from "@/components/GeneralModal";
import Entypo from "@expo/vector-icons/Entypo";
import Images from "@/components/media/Images";
import KnownFor from "@/components/person/KnownFor";
import * as WebBrowser from "expo-web-browser";
import { PosterSize } from "@/constants/enums";
import ZoomableImage from "@/components/ZoomableImage";

export default function PersonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [details, credits, externalIds, images] = usePersonDetails(id);

  const age = getAge(details?.data?.birthday);

  const socials = [
    {
      icon: "logo-facebook",
      id: externalIds?.data?.facebook_id,
      url: `https://facebook.com/${externalIds?.data?.facebook_id}`,
    },
    {
      icon: "logo-instagram",
      id: externalIds?.data?.instagram_id,
      url: `https://instagram.com/${externalIds?.data?.instagram_id}`,
    },
    { icon: "logo-x", id: externalIds?.data?.twitter_id, url: `https://twitter.com/${externalIds?.data?.twitter_id}` },
    {
      icon: "logo-tiktok",
      id: externalIds?.data?.tiktok_id,
      url: `https://tiktok.com/@${externalIds?.data?.tiktok_id}`,
    },
    {
      icon: "logo-youtube",
      id: externalIds?.data?.youtube_id,
      url: `https://youtube.com/${externalIds?.data?.youtube_id}`,
    },
  ];

  if (details?.isError) {
    return <ErrorScreen message={`Failed to load person details`} />;
  }

  return (
    <CustomScrollView>
      <View style={tw`relative h-80 w-screen mb-2`}>
        <Image
          source={BASE_IMAGE_URL + PosterSize.w780 + details?.data?.profile_path}
          alt="backdrop"
          contentFit="cover"
          cachePolicy="none"
          style={tw`flex-1`}
          blurRadius={300}
        />
        <SafeAreaView edges={["top"]} style={tw`absolute top-0 left-0 w-full h-full items-center justify-center`}>
          <ZoomableImage isPoster poster_path={BASE_IMAGE_URL + PosterSize.original + details?.data?.profile_path}>
            <Image
              source={BASE_IMAGE_URL + PosterSize.w342 + details?.data?.profile_path}
              alt="poster"
              contentFit="contain"
              cachePolicy="none"
              style={[tw`w-[154px] aspect-2/3 rounded-xl`]}
            />
          </ZoomableImage>
        </SafeAreaView>
      </View>
      <View style={tw`mx-2 mb-2 flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-3xl font-bold dark:text-white`}>{details?.data?.name}</Text>
          <View style={tw`flex-row items-center`}>
            {details?.data?.birthday && (
              <>
                <Text style={tw`font-bold dark:text-white`}>{formatDateFancy(details?.data?.birthday)}</Text>
                <Text style={tw`dark:text-white`}>{`(${age} years old)`}</Text>
              </>
            )}
          </View>
          <Text style={tw`mr-2 font-bold dark:text-white`}>{details?.data?.place_of_birth}</Text>
        </View>
      </View>
      <ScrollView horizontal style={tw`mb-4`} showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row mx-2`}>
          {socials.map((social: any, index: number) => {
            if (!social.id) return null;
            return (
              <Pressable
                key={index}
                onPress={() => WebBrowser.openBrowserAsync(social.url)}
                style={tw`mr-2 bg-zinc-300 dark:bg-zinc-800  rounded-xl px-2 py-1 flex-row items-center`}>
                <Ionicons name={social.icon} size={20} color="black" style={tw`mr-0.5 dark:text-white`} />
                <Text style={tw`text-sm font-bold dark:text-white`}>{social.id}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <Pressable onPress={() => setIsModalOpen(true)} style={tw`flex-row justify-between items-center mx-2 mb-2`}>
        <Text numberOfLines={5} ellipsizeMode="tail" style={tw`flex-1 dark:text-white`}>
          {details?.data?.biography || "No biography available."}
        </Text>
        <Entypo name="chevron-right" size={24} style={tw`w-6 dark:text-white`} />
      </Pressable>
      <GeneralModal visible={isModalOpen} onRequestClose={() => setIsModalOpen(false)} title="Overview">
        <Text style={tw`dark:text-white`}>{details?.data?.biography || "No biography available."}</Text>
      </GeneralModal>

      <KnownFor data={credits?.data?.cast || []} />

      <Images isPoster title="Images" data={images?.data?.profiles || []} />
    </CustomScrollView>
  );
}
