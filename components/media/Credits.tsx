import React from "react";
import { CastMember, CrewMember } from "@/interfaces/index";
import { FlashList } from "@shopify/flash-list";
import PersonPreviewCard from "./PersonPreviewCard";
import tw from "@/lib/tailwind";
import { View, Text } from "react-native";

interface Props {
  data: CastMember[] | CrewMember[];
}

export default function Credits({ data }: Props) {
  return (
    <View>
      <Text style={tw`text-2xl font-bold mb-2 ml-2 dark:text-white`}>Credits</Text>
      <FlashList
        style={tw`mb-2`}
        contentContainerStyle={{ marginBottom: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }: { item: CastMember | CrewMember }) => (
          <PersonPreviewCard
            key={item.id}
            id={item.id}
            name={item.name}
            role={"character" in item ? item.character : item.job}
            profile_path={item.profile_path}
          />
        )}
      />
    </View>
  );
}
