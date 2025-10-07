import React from "react";
import { NativeTabs, Icon, Label, Badge } from "expo-router/unstable-native-tabs";

export default function NewTabBar() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="ic_menu_home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="trending">
        <Label>Trending</Label>
        <Icon sf="flame.fill" drawable="ic_menu_view" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        <Icon sf="magnifyingglass" drawable="ic_menu_search" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf="person.fill" drawable="ic_menu_preferences" />
        {/* <Badge>3</Badge> */}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
