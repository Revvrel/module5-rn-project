import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { styles } from "../assets/styles/index.js";
import { Button } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
    toggleDatePicker();
  };

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatePicker();
  };

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          fullName: fullName,
          dateOfBirth: dateOfBirth,
        },
      },
    });

    supabase.auth.signOut();

    if (password !== confirmPassword) {
      setLoading(false);
      alert("Password not same as confirm password");
    } else {
      if (!error) {
        setLoading(false);
        alert("Registration successful.");
        navigation.navigate("Login");
      }
      if (error) {
        setLoading(false);
        alert(error.message);
      }
    }
  }

  return (
    // <ScrollView style={styles.container}>
    <ScrollView>
      <Text style={styles.h1}>Register to get started!</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          maximumDate={new Date("2008-1-1")}
        />
      )}

      {showPicker && Platform.OS === "ios" && (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={toggleDatePicker}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmIOSDate}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            style={styles.input}
            placeholder={"Sat Jan 01 2000"}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
      )}
      <TextInput
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm your password"
        value={confirmPassword}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button
        title={loading ? "Loading" : "Create an account"}
        onPress={handleRegister}
        disabled={loading}
        buttonStyle={{
          backgroundColor: "#FFB197",
          borderRadius: 50,
          padding: 15,
          height: 55,
        }}
        containerStyle={{
          width: 200,
          justifyContent: "center",
          marginHorizontal: 90,
          marginVertical: 10,
        }}
      />

      <View style={{ marginVertical: 10 }} />
      <View
        style={{
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>Have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }} />
    </ScrollView>
  );
}
