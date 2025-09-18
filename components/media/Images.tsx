import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ImagePreviewCard from "./ImagePreviewCard";

interface Props {
  title: string;
  data: [];
  isPoster?: boolean;
}

export default function Images({ title, data, isPoster = false }: Props) {
  return (
    <View>
      {title && <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>{title}</Text>}
      <FlashList
        style={tw`mb-2`}
        contentContainerStyle={{ marginBottom: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <ImagePreviewCard key={item.id} path={item.file_path} isPoster={isPoster} />
        )}
      />
    </View>
  );
}
