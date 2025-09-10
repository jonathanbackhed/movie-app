import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTrendingAll } from "@/lib/hooks/useTrending";
import tw from "@/lib/tailwind";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviewCard from "@/components/PreviewCard";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";

export default function Trending() {
  const { data, isLoading, error } = useTrendingAll();
  const queryClient = useQueryClient();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["trendingAll"] });
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {};

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
    // <View style={tw`flex-1 mx-2`}>
    <SafeAreaView edges={["top"]} style={tw`flex-1 mx-2`}>
      <Text style={tw`text-3xl font-bold mb-2`}>Trending</Text>

      <SegmentedControl
        values={["All", "Movies", "TV Shows"]}
        selectedIndex={selectedIndex}
        onChange={(e) => {
          setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
        }}
        style={tw`mb-2`}
      />

      <FlashList
        contentContainerStyle={{ paddingBottom: 90 }}
        estimatedItemSize={100}
        onEndReachedThreshold={0.5}
        onEndReached={() => console.log("End reached")}
        refreshing={isRefreshing}
        onRefresh={() => handleRefresh()}
        data={data.results}
        renderItem={({ item }: any) => (
          <PreviewCard
            key={item.id}
            id={item.id}
            title={item.title || item.name}
            description={item.overview}
            image={item.poster_path}
            rating={item.vote_average}
            year={item.release_date}
            adult={item.adult}
          />
        )}
      />
    </SafeAreaView>
  );
}
