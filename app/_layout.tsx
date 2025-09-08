import tw from "@/lib/tailwind";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw);
  return (
    <>
      {/* TODO: Ändra till auto */}
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
