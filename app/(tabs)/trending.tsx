import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useTrendingAll } from "@/lib/hooks/useTrending";
import tw from "@/lib/tailwind";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviewCard from "@/components/PreviewCard";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

export default function Trending() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrendingAll();
  const queryClient = useQueryClient();
  const { hideAdult } = useSettingsStore();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const flatData =
    data?.pages
      ?.flatMap((page: any) => page.results)
      .filter((item: any) => {
        if (item.media_type === "person") return false;
        if (hideAdult && item.adult === true) return false;

        return true;
      }) || [];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.removeQueries({ queryKey: ["trendingAll"] });
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (error) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg`}>Failed to load trending</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={tw`flex-1 mx-2`}>
      <PageHeader title="Trending" />
      <SegmentedControl
        values={["All", "Movies", "TV Shows"]}
        selectedIndex={selectedIndex}
        onChange={(e) => {
          setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
        }}
        style={tw`mb-2`}
      />

      {isLoading ? (
        <SafeAreaView>
          <Text style={tw`text-center my-2 text-xl`}>Loading...</Text>
        </SafeAreaView>
      ) : (
        <FlashList
          contentContainerStyle={{ paddingBottom: 90 }}
          onEndReachedThreshold={0.8}
          onEndReached={handleLoadMore}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          data={flatData}
          renderItem={({ item }: any) => (
            <PreviewCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              description={item.overview}
              image={item.poster_path}
              rating={item.vote_average}
              year={item.release_date || item.first_air_date}
              type={item.media_type}
              adult={item.adult}
            />
          )}
          ListFooterComponent={
            isFetchingNextPage ? <Text style={tw`text-center my-2`}>Loading more...</Text> : null
          }
        />
      )}
    </SafeAreaView>
  );
}
