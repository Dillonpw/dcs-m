import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
export default function Content() {
    return (
        <View className="flex-1">
            <View className="py-12 md:py-24 lg:py-32 xl:py-48">
                <View className="px-4 md:px-6">
                    <View className="flex flex-col items-center gap-4 text-center">
                        <Text
                            role="heading"
                            className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            Welcome to DCS
                        </Text>
                        <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
                            Tools for emergency dispatchers
                        </Text>
                    </View>
                    <View className="flex justify-center items-center gap-4 sm:gap-6">
                    <Link
                            className="text-md font-medium hover:underline web:underline-offset-4"
                            href="/schedule"
                        >
                            Schedule
                        </Link>
                        <Link
                            className="text-md font-medium hover:underline web:underline-offset-4"
                            href="/ageCalc"
                        >
                            Age calc
                        </Link>
                        
                        <Link
                            className="text-md font-medium hover:underline web:underline-offset-4"
                            href="/"
                        >
                            Pricing
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
}
