import PageHeader from "@/components/PageHeader";
import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, Keyboard, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { FlashList } from "@shopify/flash-list";
import PreviewCard from "@/components/PreviewCard";
import { useSearchAll } from "@/lib/hooks/useSearch";
import { useIsFocused } from "@react-navigation/native";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import { Stack } from "expo-router";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const textInputRef = useRef<TextInput>(null);
  // const isFocused = useIsFocused();
  const { hideAdult } = useSettingsStore();
  const { data, isLoading, isError } = useSearchAll(search);

  const dataFiltered =
    data?.results?.filter((item: any) => {
      if (item.media_type === "person") return false;
      if (hideAdult && item.adult === true) return false;

      return true;
    }) || [];

  // useEffect(() => {
  //   if (isFocused && textInputRef.current && search === "") textInputRef.current?.focus();
  // }, [isFocused]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Search",
          headerTransparent: true,
          headerBackVisible: false,
          headerShadowVisible: false,
          headerTitle: "",
          // headerLeft: () => null,
          // headerRight: () => null,
          headerSearchBarOptions: {
            placement: "automatic",
            placeholder: "Search movies or TV shows",
            onChangeText: (e: any) => setSearch(e.nativeEvent.text),
          },
        }}
      />
      <View style={tw`flex-1 bg-gray-100 dark:bg-black`}>
        <SafeAreaView edges={["top"]} style={tw`flex-1 mx-2 bg-gray-100 dark:bg-black`}>
          <PageHeader title="Search" />

          {isLoading ? (
            <LoadingScreen message="Loading..." />
          ) : isError ? (
            <ErrorScreen message="Failed to load search results" />
          ) : (
            <FlashList
              contentContainerStyle={{ paddingBottom: 90 }}
              data={dataFiltered}
              onScroll={() => Keyboard.dismiss()}
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
            />
          )}
        </SafeAreaView>
      </View>
    </>
  );
}
