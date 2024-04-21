import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
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
      <View className="flex h-14 items-center justify-between px-4 lg:px-6 native:hidden">
        <View className="flex flex-row gap-4 mt-2 sm:gap-6 ">
          <Link className="text-xl" href="/schedule">
            Schedule
          </Link>
          <Text className="mt-1">|</Text>

          <Link className="text-xl " href="/ageCalc">
            Age
          </Link>
          <Text className="mt-1">|</Text>


          <Link className="text-xl " href="/">
            Pricing
          </Link>
        </View>
      </View>
    </View>
  );
}
