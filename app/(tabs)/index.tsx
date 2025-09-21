import tw from "@/lib/tailwind";
import { Text, View } from "react-native";
import { useHomeData } from "@/lib/hooks/useHome";
import PageHeader from "@/components/PageHeader";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import MediaBigPreview from "@/components/MediaBigPreview";
import { filterAdult } from "@/lib/utils/filterData";
import CustomScrollView from "@/components/views/CustomScrollView";
import HorizontalMediaList from "@/components/HorizontalMediaList";

export default function Index() {
  const { hideAdult } = useSettingsStore();

  const [nowPlayingMovies, upcomingMovies, upcomingTv, topRatedMovies, topRatedTv] = useHomeData();

  const filteredData = useMemo(
    () => ({
      filteredNowPlayingMovies: filterAdult(nowPlayingMovies?.data?.results, hideAdult),
      filteredUpcomingMovies: filterAdult(upcomingMovies?.data?.results, hideAdult),
      filteredUpcomingTv: filterAdult(upcomingTv?.data?.results, hideAdult),
    }),
    [hideAdult, nowPlayingMovies, upcomingMovies, upcomingTv]
  );

  const { filteredNowPlayingMovies, filteredUpcomingMovies, filteredUpcomingTv } = filteredData;

  const filteredInfiniteData = useMemo(
    () => ({
      filteredtopRatedMovies: filterAdult(topRatedMovies?.data?.results, hideAdult),
      filteredTopRatedTv: filterAdult(topRatedTv?.data?.results, hideAdult),
    }),
    [hideAdult, topRatedMovies, topRatedTv]
  );

  const { filteredtopRatedMovies, filteredTopRatedTv } = filteredInfiniteData;

  return (
    <CustomScrollView>
      <View style={tw`mx-2`}>
        <PageHeader title="Home" />
      </View>
      <HorizontalMediaList title="In theaters" data={filteredNowPlayingMovies} type="movie" />
      <HorizontalMediaList title="Upcoming movies" data={filteredUpcomingMovies} type="movie" />
      <HorizontalMediaList title="Upcoming TV" data={filteredUpcomingTv} type="tv" />
      <HorizontalMediaList title="Top rated movies" data={filteredtopRatedMovies} type="movie" />
      <HorizontalMediaList title="Top rated TV" data={filteredTopRatedTv} type="tv" />
    </CustomScrollView>
  );
}
