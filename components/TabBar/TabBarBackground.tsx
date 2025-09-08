import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";

export default function BlurTabBarBackground() {
  return <BlurView tint="systemChromeMaterial" intensity={5} style={StyleSheet.absoluteFill} />;
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
