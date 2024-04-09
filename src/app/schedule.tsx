import React from 'react';
import { Text, View } from 'react-native';
import Header from './components/header';
import Footer from './components/footer';

export default function Schedule() {
    return (
        <View className="flex flex-1 bg-white dark:bg-black">
            <Header />
            <Text className="text-red-500 justify-center items-center">schedule test</Text>
            <Footer />
        </View>
    );
}
