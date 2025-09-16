import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import SeasonPreviewCard from "./SeasonPreviewCard";

interface Props {
  data: [];
  seriesId: string;
}

export default function Seasons({ data, seriesId }: Props) {
  return (
    <View>
      <Text style={tw`text-2xl font-bold mb-2 ml-2`}>Seasons</Text>
      <FlashList
        style={tw`mb-2`}
        contentContainerStyle={{ marginBottom: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <SeasonPreviewCard
            key={item.id}
            seriesId={seriesId}
            path={item.poster_path}
            name={item.name}
            rating={item.vote_average}
            overview={item.overview}
            date={item.air_date}
            season_number={item.season_number}
            episode_count={item.episode_count}
          />
        )}
      />
    </View>
  );
}
