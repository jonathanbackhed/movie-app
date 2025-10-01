import React from "react";
import { Text, View } from "react-native";
import tw from "@/lib/tailwind";
import PageHeader from "@/components/PageHeader";
import { Image } from "expo-image";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import SettingsRow from "@/components/settings/SettingsRow";
import SectionHeader from "@/components/SectionHeader";
import CustomSafeAreaView from "@/components/views/CustomSafeAreaView";
import SettingsWrapper from "@/components/settings/SettingsWrapper";

export default function Profile() {
  const {
    hideAdult,
    setHideAdult,
    darkMode,
    setDarkMode,
    followDevice,
    setFollowDevice,
    duskMode,
    setDuskMode,
    useOldTabBar,
    setUseOldTabBar,
  } = useSettingsStore();

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

  const handleToggleUseOldTabBar = (newValue: boolean) => {
    setUseOldTabBar(newValue);
  };

  return (
    <CustomSafeAreaView edges={["top", "bottom"]} customStyles="flex-1 pb-[60px]">
      <PageHeader title="Profile" />

      <View style={tw`items-center justify-center mb-2`}>
        <View style={tw`my-4 bg-zinc-700 dark:bg-zinc-500 h-40 w-40 rounded-full`}></View>
        <Text style={tw`text-3xl font-bold dark:text-white`}>John Doe</Text>
      </View>

      <View style={tw`mb-auto mx-2`}>
        <SectionHeader title="Settings" />
        <SettingsWrapper customStyles="mb-4">
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

        {/* <SettingsWrapper>
          <SettingsRow
            text="Use old tab bar"
            value={useOldTabBar}
            onValueChange={handleToggleUseOldTabBar}
            hideBorder
          />
        </SettingsWrapper> */}
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
