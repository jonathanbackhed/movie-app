import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ImagePreviewCard from "./ImagePreviewCard";
import { Image } from "@/interfaces";

interface Props {
  title: string;
  data: Image[];
  isPoster?: boolean;
}

export default function Images({ title, data, isPoster = false }: Props) {
  return (
    <View>
      {title && <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>{title}</Text>}
      <FlashList
        style={tw`mb-4`}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }: { item: Image; index: number }) => (
          <ImagePreviewCard key={index} path={item.file_path} isPoster={isPoster} />
        )}
      />
    </View>
  );
}
