import { View, Text } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import ReviewPreviewCard from "./ReviewPreviewCard";

interface Props {
  data: [];
}

export default function Reviews({ data }: Props) {
  return (
    <View>
      <Text style={tw`text-2xl font-bold mb-2 ml-2`}>Reviews</Text>
      <FlashList
        style={tw`mb-2`}
        contentContainerStyle={{ marginBottom: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: any }) => (
          <ReviewPreviewCard
            key={item.id}
            path={item?.author_details?.avatar_path}
            name={item?.author}
            rating={item?.author_details?.rating}
            content={item?.content}
            date={item?.created_at}
            updated_at={item?.updated_at}
          />
        )}
      />
    </View>
  );
}
