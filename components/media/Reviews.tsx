import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ReviewPreviewCard from "./ReviewPreviewCard";
import { Review } from "@/interfaces";

interface Props {
  data: Review[];
}

export default function Reviews({ data }: Props) {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Reviews</Text>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: Review }) => (
          <ReviewPreviewCard
            key={item.id}
            path={item?.author_details?.avatar_path}
            name={item?.author}
            rating={item?.author_details?.rating || -1}
            content={item?.content}
            date={item?.created_at}
            updated_at={item?.updated_at}
          />
        )}
      />
    </View>
  );
}
