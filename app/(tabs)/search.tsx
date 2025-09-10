import PageHeader from "@/components/PageHeader";
import React, { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "@/lib/tailwind";
import { FlashList } from "@shopify/flash-list";
import PreviewCard from "@/components/PreviewCard";
import { useSearchAll } from "@/lib/hooks/useSearch";

export default function Search() {
  const [search, setSearch] = useState<string>("a");
  const [shouldBlur, setShouldBlur] = useState<boolean>(false);

  const { data, isLoading, isError } = useSearchAll(search);

  const dataFiltered = data?.results?.filter((item: any) => item.media_type !== "person") || [];

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
        editable
        numberOfLines={1}
        maxLength={50}
        value={search}
        onChangeText={setSearch}
        style={tw`bg-zinc-200 p-2 rounded-xl`}
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
              shouldBlur={shouldBlur}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
