import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import tw from "@/lib/tailwind";
import PageHeader from "@/components/PageHeader";
import { Image } from "expo-image";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import SettingsRow from "@/components/settings/SettingsRow";
import SectionHeader from "@/components/SectionHeader";
import CustomSafeAreaView from "@/components/views/CustomSafeAreaView";
import SettingsWrapper from "@/components/settings/SettingsWrapper";
import ImagePreviewCard from "@/components/media/ImagePreviewCard";
import { useWatchlistStore, WatchlistItem } from "@/lib/hooks/useWatchlistStore";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Profile() {
  const { hideAdult, setHideAdult, darkMode, setDarkMode, followDevice, setFollowDevice, duskMode, setDuskMode } =
    useSettingsStore();
  const { watchlist, remove } = useWatchlistStore();

  const handleToggleAdult = (newValue: boolean) => {
    setHideAdult(newValue);
  };

  const handleToggleDarkMode = (newValue: boolean) => {
    setDarkMode(newValue);
  };

  const handleToggleFollowDevice = (newValue: boolean) => {
    setFollowDevice(newValue);
  };

  const handleToggleDuskMode = (newValue: boolean) => {
    setDuskMode(newValue);
  };

  console.log("Watchlist items:", watchlist.length);

  return (
    <CustomSafeAreaView customStyles="pb-[90px]">
      <PageHeader title="Profile" />

      {/* <View style={tw`items-center justify-center mb-4`}>
        <View style={tw`my-4 bg-zinc-700 dark:bg-zinc-500 h-40 w-40 rounded-full`}></View>
        <Text style={tw`text-3xl font-bold dark:text-white`}>John Doe</Text>
      </View> */}

      <View style={tw`mb-2`}>
        <SectionHeader title="Watchlist" />
        <SettingsWrapper customStyles="py-2">
          {watchlist.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {watchlist.map((item: WatchlistItem) => (
                <View key={item.id} style={tw`relative`}>
                  <ImagePreviewCard isPoster path={item.poster_path} id={item.id} type={item.media_type} />
                  <Pressable
                    style={tw`absolute top-0.5 left-2.5 p-1 bg-black/50 rounded-full`}
                    onPress={() => remove(item.id)}>
                    <AntDesign name="close" size={18} color="white" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={tw`h-[138px] items-center justify-center`}>
              <Text style={tw`text-zinc-500`}>Your watchlist is empty</Text>
            </View>
          )}
        </SettingsWrapper>
      </View>

      <View style={tw`mb-auto`}>
        <SectionHeader title="Settings" />
        <SettingsWrapper>
          <SettingsRow text="Hide content marked as adult" value={hideAdult} onValueChange={handleToggleAdult} />
          <SettingsRow text="Dark mode" value={darkMode} onValueChange={handleToggleDarkMode} hideBorderIfOff />
          {darkMode && (
            <>
              <SettingsRow
                subSetting
                text="Follow device"
                value={followDevice}
                onValueChange={handleToggleFollowDevice}
              />
              <SettingsRow
                subSetting
                text="Dusk mode"
                value={duskMode}
                onValueChange={handleToggleDuskMode}
                hideBorder
              />
            </>
          )}
        </SettingsWrapper>
      </View>

      <Image
        source="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="tmdb logo"
        contentFit="contain"
        style={tw`h-4`}
      />
    </CustomSafeAreaView>
  );
}
