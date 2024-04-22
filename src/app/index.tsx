import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { top } = useSafeAreaInsets();

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
    <View
      style={{ paddingTop: top }}
      className="flex-1 mb-10 mt-12 flex gap-4 bg-white dark:bg-black"
    >
      <View className="flex-row justify-center">
        <Text className="mr-5 text-xl text-black dark:text-white">
          Work Days:
        </Text>
        <TextInput
          className="text-xl text-black dark:text-white border-gray-500 text-center border-2 w-[50px] rounded-lg"          keyboardType="numeric"
          placeholder="4"
          maxLength={2}
          value={workDays}
          onChangeText={setWorkDays}
        />
      </View>
      <View className="flex-row justify-center">
        <Text className="mr-9 text-xl text-black dark:text-white">
          Off Days:
        </Text>
        <TextInput
          className="text-xl text-black dark:text-white border-gray-500 text-center border-2 w-[50px] rounded-lg"          keyboardType="numeric"
          maxLength={2}
          placeholder="2"
          value={offDays}
          onChangeText={setOffDays}
        />
      </View>
      <View className="flex-row justify-center text-black dark:text-white">
        <Text className="mr-5 text-xl text-black dark:text-white">
          Total Days:
        </Text>
        <TextInput
          className="text-xl text-black dark:text-white border-gray-500 text-center border-2 w-[50px] rounded-lg"
          keyboardType="numeric"
          maxLength={3}
          placeholder="90"
          value={totalDays}
          onChangeText={setTotalDays}
        />
      </View>
      <View className="mr-3 flex-col items-center justify-center text-black dark:text-white">
        <Text className="text-xl text-black dark:text-white">Start Date:</Text>
        <DateTimePicker
          value={startDate}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || startDate;
            setShowPicker(Platform.OS === "ios");
            setStartDate(currentDate);
          }}
        />
      </View>
      <View className="flex items-center justify-center">
        <Pressable
          className="flex items-center justify-center rounded-lg border-2 border-black bg-blue-200 px-11 py-4 shadow-sm dark:border-gray-200"
          onPress={handleGenerateSchedule}
        >
          <Text className="text-center text-xl">Show</Text>
        </Pressable>
      </View>
      <ScrollView className="m-4 rounded-2xl border-4 border-gray-300">
        <View className="grid grid-cols-3 gap-2 p-4">
          <View className="flex flex-row justify-between">
            <Text className="m-4 font-bold dark:text-white">Week Day</Text>
            <Text className=" m-4 font-bold dark:text-white">Date</Text>
            <Text className="m-4 font-bold dark:text-white">On/Off</Text>
          </View>
          {/* Data Entries */}
          {schedule.map((entry, index) => (
            <View
              key={index}
              className="flex w-full flex-row justify-between bg-slate-100 p-4"
            >
              <Text className="w-1/3 text-center font-bold ">
                {entry.dayOfWeek}
              </Text>
              <Text className="w-1/3 text-center font-bold">{entry.date}</Text>
              <Text className="w-1/3 text-center font-bold ">
                {entry.shift}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Schedule;
