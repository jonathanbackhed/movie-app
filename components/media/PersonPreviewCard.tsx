import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { ProfileSize } from "@/constants/enums";
import tw from "@/lib/tailwind";
import { GlassView } from "expo-glass-effect";

interface Props {
  id: number;
  name: string;
  role: string;
  profile_path: string | null;
}

export default function PersonPreviewCard({ id, name, role, profile_path }: Props) {
  return (
    <View style={tw`px-2 flex items-center`}>
      {profile_path === null ? (
        <GlassView style={tw`w-[70px] h-[70px] rounded-full bg-zinc-300`} glassEffectStyle="regular" />
      ) : (
        <Image
          source={BASE_IMAGE_URL + ProfileSize.w185 + profile_path}
          alt="profile image"
          contentFit="cover"
          style={tw`w-[70px] h-[70px] rounded-full`}
        />
      )}
      {/* <View style={tw`w-[70px] h-[70px] rounded-full bg-zinc-300`}></View> */}
      <Text style={tw`text-sm font-bold`}>{name}</Text>
      <Text style={tw`text-xs`}>{role}</Text>
    </View>
  );
}
