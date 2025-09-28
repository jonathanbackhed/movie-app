import React, { useCallback, useRef, useState, useMemo } from "react";
import { Text } from "react-native";
import { useTrending } from "@/lib/hooks/useTrending";
import tw from "@/lib/tailwind";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import PreviewCard from "@/components/PreviewCard";
import { FlashList } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import CustomSafeAreaView from "@/components/views/CustomSafeAreaView";
import { MediaShort, PaginatedResponse } from "@/interfaces";
import Feather from "@expo/vector-icons/Feather";
import ClickablePoster from "@/components/ClickablePoster";

export default function Trending() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [layout, setLayout] = useState<"list" | "masonry">("masonry");
  const scrollRef = useRef<any>(null);

  const [scrollPositions, setScrollPositions] = useState<number[]>([0, 0, 0]);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrending(selectedIndex);
  const queryClient = useQueryClient();
  const { hideAdult } = useSettingsStore();

  const flatData = useMemo(() => {
    return (
      data?.pages
        ?.flatMap((page: PaginatedResponse<MediaShort>) => page.results)
        .filter((item: MediaShort) => {
          if (item.media_type === "person") return false;
          if (hideAdult && item.adult === true) return false;
          return true;
        }) || []
    );
  }, [data?.pages, hideAdult]);

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
    (e: any) => {
      const { contentOffset } = e.nativeEvent;
      setScrollPositions((prev) => {
        const updated = [...prev];
        updated[selectedIndex] = contentOffset.y;
        return updated;
      });
    },
    [selectedIndex]
  );

  const handleSegmentedControlChange = useCallback(
    (e: any) => {
      setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
      if (scrollRef.current && flatData.length > 0) {
        scrollRef.current?.scrollToOffset({
          offset: scrollPositions[e.nativeEvent.selectedSegmentIndex],
          animated: false,
        });
      }
    },
    [flatData, scrollPositions]
  );

  const renderListItem = useCallback(
    ({ item }: { item: MediaShort }) => (
      <PreviewCard
        id={item.id}
        title={"title" in item ? item.title : item.name}
        description={item.overview}
        image={item.poster_path ?? ""}
        rating={item.vote_average}
        year={"release_date" in item ? item.release_date : item.first_air_date}
        type={item.media_type as "movie" | "tv"}
        adult={item.adult}
      />
    ),
    []
  );

  const renderMasonryItem = useCallback(
    ({ item }: { item: MediaShort }) => (
      <ClickablePoster id={item.id} media_type={item.media_type ?? ""} poster_path={item.poster_path ?? ""} />
    ),
    []
  );

  return (
    <CustomSafeAreaView>
      <PageHeader title="Trending">
        {/* Need mac for expo ui */}
        {/* <Pressable onPress={() => {}}>
          <Feather name="layout" size={24} color="black" />
          <Feather name="grid" size={24} color="black" />
          <Feather name="list" size={24} color="black" />
        </Pressable> */}
      </PageHeader>
      <SegmentedControl
        values={["All", "Movies", "TV Shows"]}
        selectedIndex={selectedIndex}
        onChange={(e) => {
          handleSegmentedControlChange(e);
        }}
        style={tw`mb-2`}
      />

      {isLoading ? (
        <LoadingScreen message="Loading..." />
      ) : error ? (
        <ErrorScreen message="Failed to load trending" />
      ) : layout === "list" ? (
        <FlashList
          ref={scrollRef}
          onScroll={handleScroll}
          contentContainerStyle={{ paddingBottom: 90 }}
          onEndReachedThreshold={0.8}
          onEndReached={handleLoadMore}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          keyExtractor={(item) => item.id.toString()}
          data={flatData}
          renderItem={renderListItem}
          removeClippedSubviews={true}
          ListFooterComponent={isFetchingNextPage ? <Text style={tw`text-center my-2`}>Loading more...</Text> : null}
        />
      ) : (
        <FlashList
          masonry
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 90 }}
          onEndReachedThreshold={0.6}
          onEndReached={handleLoadMore}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          keyExtractor={(item) => item.id.toString()}
          data={flatData}
          renderItem={renderMasonryItem}
          removeClippedSubviews={true}
          ListFooterComponent={isFetchingNextPage ? <Text style={tw`text-center my-2`}>Loading more...</Text> : null}
        />
      )}
    </CustomSafeAreaView>
  );
}
