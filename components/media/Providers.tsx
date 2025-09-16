import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { LogoSize } from "@/constants/enums";

interface Props {
  data: any[];
}

export default function Providers({ data }: Props) {
  return (
    <FlashList
      style={tw`mb-4 mt-2`}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item }: { item: any }) => (
        <View style={tw`px-2 flex items-center`}>
          <Image
            source={BASE_IMAGE_URL + LogoSize.w154 + item?.logo_path}
            alt="profile image"
            contentFit="cover"
            cachePolicy="none"
            style={tw`w-[50px] h-[50px] rounded-full`}
          />
        </View>
      )}
    />
  );
}
