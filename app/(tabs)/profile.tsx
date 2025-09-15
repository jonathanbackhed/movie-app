import React from "react";
import { Text, View, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import PageHeader from "@/components/PageHeader";
import { Image } from "expo-image";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

export default function Profile() {
  const { hideAdult, setHideAdult } = useSettingsStore();

  const handleToggleAdult = (newValue: boolean) => {
    setHideAdult(newValue);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={tw`flex-1 mx-2 mb-[60px]`}>
      <PageHeader title="Profile" />

      <View style={tw`items-center justify-center mb-2`}>
        <View style={tw`my-4 bg-zinc-700 h-40 w-40 rounded-full`}></View>
        <Text style={tw`text-3xl font-bold`}>John Doe</Text>
      </View>

      <View style={tw`mb-auto`}>
        <View style={tw`bg-zinc-200 mx-2 p-2 rounded-xl`}>
          <View style={tw`flex-row justify-between p-2`}>
            <Text style={tw`text-lg`}>Hide content marked as adult</Text>
            <Switch onValueChange={handleToggleAdult} value={hideAdult} />
          </View>
        </View>
      </View>

      <Image
        source="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="tmdb logo"
        contentFit="contain"
        style={tw`h-4`}
      />
    </SafeAreaView>
  );
}
