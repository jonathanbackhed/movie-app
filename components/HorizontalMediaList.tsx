import { View } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import MediaBigPreview from "./MediaBigPreview";
import SectionHeader from "./SectionHeader";
import { MediaShort } from "@/interfaces";

interface Props {
  title: string;
  data: MediaShort[];
  type?: "movie" | "tv";
}

export default function HorizontalMediaList({ title, data, type }: Props) {
  return (
    <View style={tw`mb-4`}>
      <SectionHeader title={title} customStyles="ml-2" />
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: MediaShort }) => (
          <MediaBigPreview
            key={item.id}
            id={item.id}
            poster_path={item.poster_path || ""}
            backdrop_path={item.backdrop_path || ""}
            title={"title" in item ? item.title : item.name}
            type={type ?? (item.media_type as "movie" | "tv")}
            rating={item.vote_average}
            date={"release_date" in item ? item.release_date : item.first_air_date}
          />
        )}
      />
    </View>
  );
}
