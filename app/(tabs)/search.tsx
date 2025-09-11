import PageHeader from "@/components/PageHeader";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { FlashList } from "@shopify/flash-list";
import PreviewCard from "@/components/PreviewCard";
import { useSearchAll } from "@/lib/hooks/useSearch";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [hideAdult, setHideAdult] = useState<boolean>(false);
  const textInputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();

  const { data, isLoading, isError } = useSearchAll(search);
  const { getItem } = useAsyncStorage("hideAdult");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setHideAdult(item === "y" ? true : false);
  };

  const dataFiltered =
    data?.results?.filter((item: any) => {
      if (item.media_type === "person") return false;
      if (hideAdult && item.adult === true) return false;

      return true;
    }) || [];

  useEffect(() => {
    if (isFocused && textInputRef.current && search === "") textInputRef.current?.focus();
    if (isFocused) readItemFromStorage();
  }, [isFocused]);

  if (isError) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg`}>Failed to load trending</Text>
      </SafeAreaView>
    );
  }

  return (
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
        style={tw`bg-zinc-200 p-3 rounded-xl mb-2`}
      />

      {isLoading ? (
        <SafeAreaView>
          <Text style={tw`text-center my-2 text-xl`}>Loading...</Text>
        </SafeAreaView>
      ) : (
        <FlashList
          contentContainerStyle={{ paddingBottom: 90 }}
          estimatedItemSize={20}
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
  );
}
