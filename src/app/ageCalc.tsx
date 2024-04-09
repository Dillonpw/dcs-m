import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/header";
import Footer from "./components/footer";

export default function AgeCalc() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchAndSetData = async () => {
      const storedYear = await AsyncStorage.getItem("year");
      const storedResult = await AsyncStorage.getItem("result");
      if (storedYear) {
        setYear(storedYear);
        // If a result was saved, display it, otherwise calculate again
        if (storedResult) {
          setResult(`Patient is: ${storedResult}`);
        } else {
          calculateAndDisplayResult(storedYear);
        }
      }
    };

    fetchAndSetData();
  }, []);

  const calculateAndDisplayResult = (inputYear) => {
    const age = new Date().getFullYear() - parseInt(inputYear);
    setResult(`Patient is: ${age}`);
    saveData(inputYear, age.toString());
  };

  const saveData = async (year, result) => {
    try {
      await AsyncStorage.setItem("year", year);
      await AsyncStorage.setItem("result", result);
    } catch (error) {
      // Handle errors here
    }
  };

  const handleSubmit = () => {
    if (!isNaN(parseInt(year))) {
      calculateAndDisplayResult(year);
    }
  };
  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Header />

      <View className="flex flex-row items-center justify-center">
        <Text>Birth Year:</Text>
        <TextInput
          className="m-4 w-[30%] rounded-lg border border-gray-300 p-2"
          onChangeText={setYear}
          value={year}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <View className="flex flex-col items-center justify-center">
        <Pressable
          className="w-[30%] rounded-lg bg-black"
          onPress={handleSubmit}
        >
          <Text className="p-4 text-center text-white">Submit</Text>
        </Pressable>
        <Text>{result}</Text>
      </View>

      <Footer />
    </View>
  );
}
