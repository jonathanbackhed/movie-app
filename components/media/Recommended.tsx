import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ImagePreviewCard from "./ImagePreviewCard";
import { Recommendation } from "@/interfaces";

interface Props {
  data: Recommendation[];
}

export default function Recommended({ data }: Props) {
  return (
    <View>
      <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Recommended</Text>
      <FlashList
        style={tw`mb-4`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: Recommendation }) => (
          <ImagePreviewCard
            key={item?.id}
            id={item?.id}
            path={item?.poster_path}
            isPoster={true}
            type={item?.media_type as "movie" | "tv"}
          />
        )}
      />
    </View>
  );
}
