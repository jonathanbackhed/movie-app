import HapticTab from "@/components/TabBar/HapticTab";
import NewTabBar from "@/components/TabBar/NewTabBar";
import BlurTabBarBackground from "@/components/TabBar/TabBarBackground";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { isLiquidGlassAvailable } from "expo-glass-effect";

export default function TabsLayout() {
  // const canUseLiquidGlass = Platform.OS === "ios" && Platform.Version >= "26";

  if (isLiquidGlassAvailable()) {
    return <NewTabBar />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: Platform.select({
          ios: BlurTabBarBackground,
          default: undefined,
        }),
        tabBarStyle: Platform.select({
          ios: { position: "absolute", borderTopColor: "transparent" },
          default: {},
        }),
        animation: "fade",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: "Trending",
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="fire" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => <FontAwesome5 name="user-alt" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
