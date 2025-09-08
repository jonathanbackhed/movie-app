import HapticTab from "@/components/TabBar/HapticTab";
import BlurTabBarBackground from "@/components/TabBar/TabBarBackground.ios";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";

export default function TabBarLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarButton: HapticTab, tabBarBackground: BlurTabBarBackground }}>
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
          //   tabBarBadge: 3,
          //   tabBarBadgeStyle: { backgroundColor: "black", color: "white" },
        }}
      />
    </Tabs>
  );
}
