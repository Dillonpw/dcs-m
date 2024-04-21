import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
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

  const calculateAndDisplayResult = (inputYear: string) => {
    const age = new Date().getFullYear() - parseInt(inputYear);
    setResult(`Patient is: ${age}`);
    saveData(inputYear, age.toString());
  };

  const saveData = async (year: string, result: string) => {
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

      <View className="flex flex-1 flex-col gap-4 items-center justify-center ">
        <Text className="dark:text-white text-2xl">Birth Year:</Text>
        <TextInput
          className="m-4 w-[30%] rounded-lg border-2 text-center text-xl border-gray-300 p-2 dark:text-white"
          onChangeText={setYear}
          value={year}
          keyboardType="numeric"
          maxLength={4}
        />
        <Pressable
          className="w-[30%] rounded-lg bg-black dark:bg-slate-100"
          onPress={handleSubmit}
        >
          <Text className="p-4 text-center font-bold text-white dark:text-black">
            Submit
          </Text>
        </Pressable>
        <Text className=" m-2 text-3xl font-bold dark:text-white">
          {result}
        </Text>
        <Text>If the patient's birthday has not occured this year, subtract 1</Text>
      </View>
      <Footer />
    </View>
  );
}
