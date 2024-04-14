import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Platform,
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
    <View>
      <Header />
      <ScrollView>
        <View >
          <Text>Work Days:</Text>
          <TextInput
            
            keyboardType="numeric"
            placeholder="4"
            value={workDays}
            onChangeText={setWorkDays}
          />
        </View>
        <View>
          <Text>Off Days:</Text>
          <TextInput

            keyboardType="numeric"
            placeholder="2"
            value={offDays}
            onChangeText={setOffDays}
          />
        </View>
        <View >
          <Text>Total Days:</Text>
          <TextInput
           
            keyboardType="numeric"
            placeholder="90"
            value={totalDays}
            onChangeText={setTotalDays}
          />
        </View>
        <View>
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
        <Button title="Show Schedule" onPress={handleGenerateSchedule} />
        <View>
          <Text>Week Day</Text>
          <Text>Date</Text>
          <Text>On/Off</Text>
          {schedule.map((entry, index) => (
            <View key={index}>
              <Text>{entry.dayOfWeek}</Text>
              <Text>{entry.date}</Text>
              <Text>{entry.shift}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Schedule;
