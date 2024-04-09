import React from 'react';
import { View } from 'react-native';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

export default function Page() {
    return (
        <View className="flex flex-1 bg-white dark:bg-black">
            <Header />
            <Content />
            <Footer />
        </View>
    );
}
