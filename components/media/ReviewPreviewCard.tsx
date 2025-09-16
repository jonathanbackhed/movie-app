import { View, Text, Modal, Button, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { BASE_IMAGE_URL } from "@/constants/settings";
import { Image } from "expo-image";
import { ProfileSize } from "@/constants/enums";
import Entypo from "@expo/vector-icons/Entypo";
import { GlassView } from "expo-glass-effect";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  path: string;
  name: string;
  rating: number;
  content: string;
  date: string;
  updated_at: string;
}

export default function ReviewPreviewCard({ path, name, rating, content, date, updated_at }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Pressable
        onPress={() => setIsModalOpen(true)}
        style={tw`w-[300px] h-auto mx-2 bg-zinc-50 rounded-lg p-2 shadow-sm`}>
        <View style={tw`flex-1 flex-row items-center mb-1`}>
          <Text numberOfLines={7} ellipsizeMode="tail" style={tw`flex-1 `}>
            {content}
          </Text>
          <Entypo name="chevron-right" size={24} style={tw`w-6`} />
        </View>
        <View style={tw`flex-row items-center`}>
          {path ? (
            <Image
              source={BASE_IMAGE_URL + ProfileSize.w45 + path}
              alt="image"
              style={tw`w-[30px] h-[30px] rounded-full mr-1`}
              cachePolicy="none"
              contentFit="contain"
            />
          ) : (
            <GlassView
              style={tw`w-[30px] h-[30px] rounded-full mr-1 bg-zinc-300`}
              glassEffectStyle="regular"
            />
          )}
          <Text style={tw`font-bold flex-1`}>{name}</Text>
          <View style={tw`flex items-end`}>
            {/* <Text style={tw`font-bold`}>{date.split("T")[0]}</Text> */}
            <Text style={tw`font-bold`}>
              {rating}
              <AntDesign name="star" size={12} color="#ffdf20" />
            </Text>
            <Text style={tw`text-xs`}>{updated_at.split("T")[0]}</Text>
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        allowSwipeDismissal
        visible={isModalOpen}
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalOpen(false)}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between p-6 pb-0 mb-2`}>
            <View>
              <Text style={tw`text-3xl font-bold`}>Overview</Text>
              <View style={tw`flex-row`}>
                <Text style={tw`font-bold mr-2`}>{date.split("T")[0]}</Text>
                {updated_at && <Text style={tw`text-xs`}>Updated: {updated_at.split("T")[0]}</Text>}
              </View>
            </View>
            <Button title="Close" onPress={() => setIsModalOpen(false)} />
          </View>
          <ScrollView style={tw`px-6`}>
            <Text style={tw`mb-10`}>{content}</Text>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
