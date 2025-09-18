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
        style={tw`w-[300px] h-auto mx-2 bg-zinc-50 rounded-lg p-2 shadow-sm dark:bg-zinc-900`}>
        <View style={tw`flex-1 flex-row items-center mb-1`}>
          <Text numberOfLines={7} ellipsizeMode="tail" style={tw`flex-1 dark:text-white`}>
            {content}
          </Text>
          <Entypo name="chevron-right" size={24} style={tw`w-6 dark:text-white`} />
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
          <Text style={tw`font-bold flex-1 dark:text-white`}>{name}</Text>
          <View style={tw`flex items-end`}>
            <Text style={tw`font-bold dark:text-white`}>
              {rating}
              <AntDesign name="star" size={12} color="#ffdf20" />
            </Text>
            <Text style={tw`text-xs dark:text-white`}>{date.split("T")[0]}</Text>
          </View>
        </View>
        <Text style={tw`text-xs dark:text-white`}>Updated: {updated_at.split("T")[0]}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        allowSwipeDismissal
        visible={isModalOpen}
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalOpen(false)}>
        <View style={tw`flex-1 dark:bg-black`}>
          <View style={tw`flex-row justify-between p-6 pb-0 mb-2`}>
            <Text style={tw`text-3xl font-bold dark:text-white`}>Overview</Text>
            <Button title="Close" onPress={() => setIsModalOpen(false)} />
          </View>
          <ScrollView style={tw`px-6`}>
            <View style={tw`flex-row items-center mb-1`}>
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
              <Text style={tw`font-bold flex-1 dark:text-white`}>{name}</Text>
              <View style={tw`flex items-end`}>
                <Text style={tw`font-bold dark:text-white`}>
                  {rating}
                  <AntDesign name="star" size={12} color="#ffdf20" />
                </Text>
                <Text style={tw`text-xs dark:text-white`}>{date.split("T")[0]}</Text>
              </View>
            </View>
            <Text style={tw`font-bold mb-4 dark:text-white`}>Updated: {updated_at.split("T")[0]}</Text>
            <Text style={tw`mb-10 dark:text-white`}>{content}</Text>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
