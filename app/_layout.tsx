import tw from "@/lib/tailwind";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw);
  return (
    <>
      {/* TODO: Ändra till auto */}
      <StatusBar style="dark" />
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </>
  );
}
