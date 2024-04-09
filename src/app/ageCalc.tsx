import React from 'react';
import { Text, View } from 'react-native';
import Header from './components/header';
import Footer from './components/footer';

export default function AgeCalc() {
    return (
        <View className="flex flex-1 bg-white dark:bg-black">
            <Header />
            <Text className="text-red-500 justify-center items-center">Age calc test</Text>
            <Footer />
        </View>
    );
}
