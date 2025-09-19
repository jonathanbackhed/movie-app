import tw from "@/lib/tailwind";
import { ScrollView, Text, View } from "react-native";
import { useHomeData } from "@/lib/hooks/useHome";
import PageHeader from "@/components/PageHeader";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import MediaBigPreview from "@/components/MediaBigPreview";
import { SafeAreaView } from "react-native-safe-area-context";
import { filterAdult } from "@/lib/utils/filterData";

export default function Index() {
  const { hideAdult } = useSettingsStore();

  const [nowPlayingMovies, upcomingMovies, upcomingTv, topRatedMovies, topRatedTv] = useHomeData();

  const filteredNowPlayingMovies = useMemo(() => {
    return filterAdult(nowPlayingMovies?.data?.results, hideAdult);
  }, [nowPlayingMovies, hideAdult]);

  const filteredUpcomingMovies = useMemo(() => {
    return filterAdult(upcomingMovies?.data?.results, hideAdult);
  }, [upcomingMovies, hideAdult]);

  const filteredUpcomingTv = useMemo(() => {
    return filterAdult(upcomingTv?.data?.results, hideAdult);
  }, [upcomingTv, hideAdult]);

  const filteredtopRatedMovies = useMemo(() => {
    return filterAdult(topRatedMovies?.data?.results, hideAdult);
  }, [topRatedMovies, hideAdult]);

  const filteredTopRatedTv = useMemo(() => {
    return filterAdult(topRatedTv?.data?.results, hideAdult);
  }, [topRatedTv, hideAdult]);

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 dark:bg-black`} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={tw`mx-2`}>
        <PageHeader title="Home" />
      </View>
      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>In theaters</Text>
        <FlashList
          contentContainerStyle={{ marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredNowPlayingMovies}
          renderItem={({ item }: { item: any }) => (
            <MediaBigPreview
              key={item.id}
              id={item.id}
              poster_path={item?.poster_path}
              backdrop_path={item?.backdrop_path}
              title={item?.title}
              type="movie"
              rating={item?.vote_average}
              date={item?.release_date || item?.first_air_date}
            />
          )}
        />
      </View>

      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Upcoming movies</Text>
        <FlashList
          contentContainerStyle={{ marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredUpcomingMovies}
          renderItem={({ item }: { item: any }) => (
            <MediaBigPreview
              key={item.id}
              id={item.id}
              poster_path={item?.poster_path}
              backdrop_path={item?.backdrop_path}
              title={item?.title}
              type="movie"
              rating={item?.vote_average}
              date={item?.release_date}
            />
          )}
        />
      </View>

      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Upcoming TV</Text>
        <FlashList
          contentContainerStyle={{ marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredUpcomingTv}
          renderItem={({ item }: { item: any }) => (
            <MediaBigPreview
              key={item.id}
              id={item.id}
              poster_path={item?.poster_path}
              backdrop_path={item?.backdrop_path}
              title={item?.name}
              type="tv"
              rating={item?.vote_average}
              date={item?.first_air_date}
            />
          )}
        />
      </View>

      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Top rated movies</Text>
        <FlashList
          contentContainerStyle={{ marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredtopRatedMovies}
          renderItem={({ item }: { item: any }) => (
            <MediaBigPreview
              key={item.id}
              id={item.id}
              poster_path={item?.poster_path}
              backdrop_path={item?.backdrop_path}
              title={item?.title}
              type="movie"
              rating={item?.vote_average}
              date={item?.release_date}
            />
          )}
        />
      </View>

      <View style={tw`mb-2`}>
        <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Top rated TV</Text>
        <FlashList
          contentContainerStyle={{ marginBottom: 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredTopRatedTv}
          renderItem={({ item }: { item: any }) => (
            <MediaBigPreview
              key={item.id}
              id={item.id}
              poster_path={item?.poster_path}
              backdrop_path={item?.backdrop_path}
              title={item?.name}
              type="tv"
              rating={item?.vote_average}
              date={item?.first_air_date}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}
