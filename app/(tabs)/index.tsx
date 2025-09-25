import tw from "@/lib/tailwind";
import { View } from "react-native";
import { useHomeData } from "@/lib/hooks/useHome";
import PageHeader from "@/components/PageHeader";
import { useMemo } from "react";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import { filterAdult } from "@/lib/utils/dataUtils";
import CustomScrollView from "@/components/views/CustomScrollView";
import HorizontalMediaList from "@/components/HorizontalMediaList";
import { MovieShort, SeriesShort } from "@/interfaces";

export default function Index() {
  const { hideAdult } = useSettingsStore();

  const [nowPlayingMovies, upcomingTheaterMovies, upcomingTv, topRatedMovies, topRatedTv] = useHomeData();

  const filteredData = useMemo(
    () => ({
      filteredNowPlayingMovies: filterAdult(nowPlayingMovies?.data?.results || [], hideAdult) as MovieShort[],
      filteredUpcomingTheaterMovies: filterAdult(upcomingTheaterMovies?.data?.results || [], hideAdult) as MovieShort[],
      filteredUpcomingTv: filterAdult(upcomingTv?.data?.results || [], hideAdult) as SeriesShort[],
    }),
    [hideAdult, nowPlayingMovies, upcomingTheaterMovies, upcomingTv]
  );

  const { filteredNowPlayingMovies, filteredUpcomingTheaterMovies, filteredUpcomingTv } = filteredData;

  const filteredInfiniteData = useMemo(
    () => ({
      filteredtopRatedMovies: filterAdult(topRatedMovies?.data?.results || [], hideAdult) as MovieShort[],
      filteredTopRatedTv: filterAdult(topRatedTv?.data?.results || [], hideAdult) as SeriesShort[],
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
      <HorizontalMediaList title="Upcoming theatrical movies" data={filteredUpcomingTheaterMovies} type="movie" />
      <HorizontalMediaList title="Upcoming TV" data={filteredUpcomingTv} type="tv" />
      <HorizontalMediaList title="Top rated movies" data={filteredtopRatedMovies} type="movie" />
      <HorizontalMediaList title="Top rated TV" data={filteredTopRatedTv} type="tv" />
    </CustomScrollView>
  );
}
