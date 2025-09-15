import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ImagePreviewCard from "./ImagePreviewCard";

interface Props {
  data: [];
}

export default function Recommended({ data }: Props) {
  return (
    <View>
      <Text style={tw`text-2xl font-bold mb-2 ml-2`}>Recommended</Text>
      <FlashList
        style={tw`mb-2`}
        contentContainerStyle={{ marginBottom: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <ImagePreviewCard
            key={item?.id}
            id={item?.id}
            path={item?.poster_path}
            isPoster={true}
            type={item?.media_type}
          />
        )}
      />
    </View>
  );
}
