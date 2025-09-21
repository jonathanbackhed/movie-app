import { View, Text, Modal, Button } from "react-native";
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
      <View style={tw`flex-1 p-6 bg-gray-100 ${duskMode ? "dark:bg-zinc-900" : "dark:bg-black"}`}>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-3xl font-bold mb-2 dark:text-white`}>{title}</Text>
          <Button title="Close" onPress={onRequestClose} />
        </View>
        {children}
      </View>
    </Modal>
  );
}
