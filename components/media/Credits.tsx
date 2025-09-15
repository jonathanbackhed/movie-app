import React from "react";
import { ICastMember, ICrewMember } from "@/interfaces/movies/ICredits";
import { FlashList } from "@shopify/flash-list";
import PersonPreviewCard from "../PersonPreviewCard";
import tw from "@/lib/tailwind";

interface Props {
  credits: ICastMember[] | ICrewMember[];
}

export default function Credits({ credits }: Props) {
  return (
    <FlashList
      style={tw`mb-2`}
      contentContainerStyle={{ marginBottom: 8 }}
      horizontal
      data={credits}
      renderItem={({ item }: { item: ICastMember | ICrewMember }) => (
        <PersonPreviewCard
          key={item.id}
          id={item.id}
          name={item.name}
          role={"character" in item ? item.character : item.job}
          profile_path={item.profile_path}
        />
      )}
    />
  );
}
