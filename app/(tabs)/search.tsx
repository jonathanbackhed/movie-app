import PageHeader from "@/components/PageHeader";
import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, Keyboard, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { FlashList } from "@shopify/flash-list";
import PreviewCard from "@/components/PreviewCard";
import { useSearchAll } from "@/lib/hooks/useSearch";
import { useIsFocused } from "@react-navigation/native";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const textInputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();
  const { hideAdult } = useSettingsStore();
  const { data, isLoading, isError } = useSearchAll(search);

  const dataFiltered =
    data?.results?.filter((item: any) => {
      if (item.media_type === "person") return false;
      if (hideAdult && item.adult === true) return false;

      return true;
    }) || [];

  useEffect(() => {
    if (isFocused && textInputRef.current && search === "") textInputRef.current?.focus();
  }, [isFocused]);

  return (
    <View style={tw`flex-1 dark:bg-black`}>
      <SafeAreaView edges={["top"]} style={tw`flex-1 mx-2`}>
        <PageHeader title="Search" />
        <TextInput
          ref={textInputRef}
          editable
          numberOfLines={1}
          maxLength={50}
          value={search}
          onChangeText={setSearch}
          placeholder="Search for a movie or TV show"
          clearButtonMode="always"
          inputMode="text"
          autoComplete="off"
          style={tw`bg-zinc-200 dark:bg-zinc-800 dark:text-white p-3 rounded-xl mb-2`}
        />

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
  );
}
