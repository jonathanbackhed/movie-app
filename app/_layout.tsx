import tw from "@/lib/tailwind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDeviceContext } from "twrnc";

const queryClient = new QueryClient();

export default function RootLayout() {
  useDeviceContext(tw);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
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
              headerBackButtonMenuEnabled: true,
              headerBackTitle: "Back",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
