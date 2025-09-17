import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { useTrending } from "@/lib/hooks/useTrending";
import tw from "@/lib/tailwind";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviewCard from "@/components/PreviewCard";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";

export default function Trending() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const scrollRef = useRef<any>(null);

  const [all, setAll] = useState<number>(0);
  const [movie, setMovie] = useState<number>(0);
  const [tv, setTv] = useState<number>(0);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrending(selectedIndex);
  const queryClient = useQueryClient();
  const { hideAdult } = useSettingsStore();

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
    await queryClient.removeQueries({ queryKey: ["trending"] });
    setIsRefreshing(false);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = useCallback(
    (event: any) => {
      const { contentOffset } = event.nativeEvent;

      if (selectedIndex === 0) {
        setAll(contentOffset.y);
      } else if (selectedIndex === 1) {
        setMovie(contentOffset.y);
      } else if (selectedIndex === 2) {
        setTv(contentOffset.y);
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    if (scrollRef.current && flatData.length > 0) {
      scrollRef.current.scrollToOffset({
        offset: selectedIndex === 0 ? all : selectedIndex === 1 ? movie : tv,
        animated: true,
      });
    }
  }, [flatData, selectedIndex]);

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
        <LoadingScreen message="Loading..." />
      ) : error ? (
        <ErrorScreen message="Failed to load trending" />
      ) : (
        <FlashList
          ref={scrollRef}
          onScroll={handleScroll}
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
