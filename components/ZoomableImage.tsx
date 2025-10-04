import { View, Text, Animated, Dimensions, Modal, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import tw from "@/lib/tailwind";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { GlassView } from "expo-glass-effect";

interface Props {
  children: React.ReactNode;
  poster_path: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ZoomableImage({ children, poster_path }: Props) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Opening fullscreen
      setIsFullscreen(true);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 9,
          tension: 50,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Closing fullscreen
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 50,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <>
      <Pressable onPress={toggleFullscreen}>{children}</Pressable>
      <Modal
        visible={isFullscreen}
        transparent={true}
        animationType="none"
        onRequestClose={toggleFullscreen}
        statusBarTranslucent>
        <Animated.View style={[tw`flex-1`, { opacity: opacityAnim }]}>
          <BlurView intensity={20} tint="dark" style={tw`absolute inset-0`} />
          <View style={tw`flex-1 bg-black/60`}>
            <SafeAreaView edges={["top"]} style={tw`flex-1`}>
              <Animated.View style={[tw`absolute top-14 right-2 z-10`, { opacity: opacityAnim }]}>
                <Pressable onPress={toggleFullscreen}>
                  <GlassView
                    glassEffectStyle="regular"
                    tintColor="rgba(255, 255, 255, 0.1)"
                    style={tw`w-12 h-12 rounded-full items-center justify-center overflow-hidden`}>
                    <Entypo name="cross" size={28} color="white" />
                  </GlassView>
                </Pressable>
              </Animated.View>
              <Pressable onPress={toggleFullscreen} style={tw`flex-1 items-center justify-center`}>
                <Animated.View
                  style={{
                    transform: [
                      {
                        scale: scaleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1],
                        }),
                      },
                    ],
                    width: SCREEN_WIDTH * 0.9,
                    aspectRatio: 2 / 3,
                  }}>
                  <Image
                    source={poster_path}
                    alt="poster fullscreen"
                    contentFit="contain"
                    cachePolicy="none"
                    style={tw`w-full h-full rounded-xl`}
                  />
                </Animated.View>
              </Pressable>
            </SafeAreaView>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}
