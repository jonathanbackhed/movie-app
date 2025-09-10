import SafeArea from "@/components/SafeArea";
import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useTrendingAll } from "@/lib/hooks/useTrending";
import tw from "@/lib/tailwind";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviewCard from "@/components/PreviewCard";

export default function Trending() {
  const { data, isLoading, error } = useTrendingAll();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <Text>Failed to load trending</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView edges={["top"]} style={tw`mx-2 mb-2`}>
        <Text style={tw`text-3xl font-bold mb-2`}>Trending</Text>

        <SegmentedControl
          values={["All", "Movies", "TV Shows"]}
          selectedIndex={selectedIndex}
          onChange={(e) => {
            setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
          }}
        />
      </SafeAreaView>

      <ScrollView style={tw`flex-1 mx-2`}>
        {data.results.map((movie: any) => (
          <PreviewCard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name}
            description={movie.overview}
            image={movie.poster_path}
            rating={movie.vote_average}
            year={movie.release_date}
            adult={movie.adult}
          />
        ))}
      </ScrollView>
    </View>
  );
}
