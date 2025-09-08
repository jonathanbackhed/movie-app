import ColorBlock from "@/components/ColorBlock";
import tw from "@/lib/tailwind";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`mb-2`}>Edit app/index.tsx to edit this screen.</Text>
      <ColorBlock twColor="bg-oggabogga" />
    </View>
  );
}
