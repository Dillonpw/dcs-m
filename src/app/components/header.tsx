import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="flex h-14 flex-row items-center justify-between px-4 lg:px-6 ">
        <Link
          className="flex-1 items-center justify-center font-bold dark:text-white"
          href="/"
        >
          DCS
        </Link>
      </View>
    </View>
  );
}
