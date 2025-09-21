import tw from "@/lib/tailwind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDeviceContext, useAppColorScheme } from "twrnc";
import { useSettingsStore } from "@/lib/hooks/useSettingsStore";
import { useEffect } from "react";
import { Appearance } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { darkMode, followDevice } = useSettingsStore();
  const systemColorScheme = Appearance.getColorScheme();

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: darkMode ? "dark" : "light",
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

  useEffect(() => {
    if (darkMode && followDevice) {
      setColorScheme(systemColorScheme);
      Appearance.setColorScheme(null);
    } else if (darkMode && !followDevice) {
      setColorScheme("dark");
      Appearance.setColorScheme("dark");
    } else {
      setColorScheme("light");
      Appearance.setColorScheme("light");
    }
  }, [darkMode, followDevice, systemColorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      {darkMode && followDevice ? (
        <StatusBar style="auto" />
      ) : darkMode && !followDevice ? (
        <StatusBar style="light" />
      ) : (
        <StatusBar style="dark" />
      )}
      <SafeAreaProvider>
        <Stack key={tw.memoBuster}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="media/[id]"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "",
              headerBackButtonDisplayMode: "minimal",
              headerBackButtonMenuEnabled: false,
              headerBackTitle: "Back",
              fullScreenGestureEnabled: true,
              fullScreenGestureShadowEnabled: true,
            }}
          />
          <Stack.Screen
            name="person/[id]"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "",
              headerBackButtonDisplayMode: "minimal",
              headerBackButtonMenuEnabled: false,
              headerBackTitle: "Back",
              fullScreenGestureEnabled: true,
              fullScreenGestureShadowEnabled: true,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
