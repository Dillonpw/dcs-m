import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "./components/header";
import Footer from "./components/footer";

const formatDate = (date) => {
  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${date.getFullYear()}`;
};

const getDayOfWeek = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

const generateRotatingSchedule = (workDays, offDays, totalDays, startDate) => {
  let schedule = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < totalDays; i++) {
    const formattedDate = formatDate(currentDate);
    const dayOfWeek = getDayOfWeek(currentDate);
    const shift = i % (workDays + offDays) < workDays ? "Work" : "Off";
    schedule.push({ date: formattedDate, dayOfWeek, shift });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
};

const Schedule = () => {
  const [workDays, setWorkDays] = useState("");
  const [offDays, setOffDays] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const handleGenerateSchedule = () => {
    const schedule = generateRotatingSchedule(
      parseInt(workDays),
      parseInt(offDays),
      parseInt(totalDays),
      startDate,
    );
    setSchedule(schedule);
  };

  return (
    <View className="flex flex-1 bg-white dark:bg-black">
      <Header />
      <View className="flex-row justify-center text-black dark:text-white">
        <Text>Work Days:</Text>
        <TextInput
          className="text-black dark:text-white"
          keyboardType="numeric"
          placeholder="4"
          value={workDays}
          onChangeText={setWorkDays}
        />
      </View>
      <View className="flex-row justify-center text-black dark:text-white">
        <Text>Off Days:</Text>
        <TextInput
          className="text-black dark:text-white"
          keyboardType="numeric"
          placeholder="2"
          value={offDays}
          onChangeText={setOffDays}
        />
      </View>
      <View className="flex-row justify-center text-black dark:text-white">
        <Text>Total Days:</Text>
        <TextInput
          className="text-black dark:text-white"
          keyboardType="numeric"
          placeholder="90"
          value={totalDays}
          onChangeText={setTotalDays}
        />
      </View>
      <View className="flex-col items-center justify-center text-black dark:text-white">
        <Text>Start Date:</Text>
        <Button title="Select Date" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || startDate;
              setShowPicker(Platform.OS === "ios");
              setStartDate(currentDate);
            }}
          />
        )}
      </View>
      <View className="flex justify-center items-center">
        <Pressable
          className=" w-[30%] rounded-lg bg-blue-50 p-4 hover:bg-blue-300"
          onPress={handleGenerateSchedule}
        >
          <Text className="text-center text-xl">Show</Text>
        </Pressable>
      </View>
      <ScrollView className="m-4 border-4 border-gray-300 rounded-2xl">
      <View className="p-4 grid grid-cols-3 gap-4">
        <View className="flex flex-row justify-between">
        <Text className="ml-4 font-bold">Week Day</Text>
        <Text className="font-bold">Date</Text>
        <Text className="mr-4 font-bold">On/Off</Text>
        </View>
        {/* Data Entries */}
        {schedule.map((entry, index) => (
          <View key={index} className="flex flex-row justify-between w-full">
            <Text className="text-center w-1/3">{entry.dayOfWeek}</Text>
            <Text className="text-center w-1/3">{entry.date}</Text>
            <Text className="text-center w-1/3">{entry.shift}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
      <Footer />
    </View>
  );
};

export default Schedule;
