import { View, Text, Modal, Button, ScrollView } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function GeneralModal({ visible, onRequestClose, title, children }: Props) {
  const { duskMode } = useSettingsStore();
  return (
    <Modal
      animationType="slide"
      allowSwipeDismissal
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={onRequestClose}>
      <View style={tw`flex-1 p-6 pb-0 bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"}`}>
        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-3xl font-bold dark:text-white`}>{title}</Text>
          <Button title="Close" onPress={onRequestClose} />
        </View>
        <ScrollView style={tw`-mx-6`} contentContainerStyle={tw`px-6 pb-10`}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}
