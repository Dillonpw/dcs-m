import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100"
      style={{ paddingBottom: bottom }}
    >
      <View className="flex h-14 items-center justify-between px-4 lg:px-6">
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
