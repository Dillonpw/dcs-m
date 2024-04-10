/*not ready
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
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

const App = () => {
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
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <Text>Work Days:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="4"
            value={workDays}
            onChangeText={setWorkDays}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Off Days:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="2"
            value={offDays}
            onChangeText={setOffDays}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Total Days:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="90"
            value={totalDays}
            onChangeText={setTotalDays}
          />
        </View>
        <View style={styles.inputGroup}>
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
        <View style={styles.table}>
          <Text style={styles.tableHeader}>Week Day</Text>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>On/Off</Text>
          {schedule.map((entry, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{entry.dayOfWeek}</Text>
              <Text style={styles.tableCell}>{entry.date}</Text>
              <Text style={styles.tableCell}>{entry.shift}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 5,
    width: 200,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    fontWeight: "bold",
    color: "#444",
    minWidth: 80,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tableCell: {
    minWidth: 80,
    textAlign: "center",
  },
});

export default App;
