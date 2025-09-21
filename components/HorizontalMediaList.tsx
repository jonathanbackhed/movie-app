import { View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import MediaBigPreview from "./MediaBigPreview";
import SectionHeader from "./SectionHeader";

interface Props {
  title: string;
  data: any[];
  type: "movie" | "tv";
}

export default function HorizontalMediaList({ title, data, type }: Props) {
  return (
    <View style={tw`mb-4`}>
      <SectionHeader title={title} customStyles="ml-2" />
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <MediaBigPreview
            key={item.id}
            id={item.id}
            poster_path={item?.poster_path}
            backdrop_path={item?.backdrop_path}
            title={item?.title}
            type={type}
            rating={item?.vote_average}
            date={item?.release_date || item?.first_air_date}
          />
        )}
      />
    </View>
  );
}
