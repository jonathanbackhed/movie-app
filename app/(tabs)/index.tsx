import ColorBlock from "@/components/ColorBlock";
import tw from "@/lib/tailwind";
import { Button, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`mb-2`}>Edit app/index.tsx to edit this screen.</Text>
      <ColorBlock twColor="bg-cyan-600" />

      <Link style={tw`mb-4`} href={"/media/16997?type=tv"}>
        <Text style={tw`text-2xl`}>THE PACIFIC</Text>
      </Link>
      <Link style={tw`mb-4`} href={"/media/1396?type=tv"}>
        <Text style={tw`text-2xl`}>BREAKING BAD</Text>
      </Link>
      <Link style={tw`mb-4`} href={"/media/1949?type=movie"}>
        <Text style={tw`text-2xl`}>ZODIAC</Text>
      </Link>
      <Link style={tw`mb-4`} href={"/media/884605?type=movie"}>
        <Text style={tw`text-2xl`}>NO HARD FEELINGS</Text>
      </Link>
    </View>
  );
}
