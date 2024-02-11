import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Button, Text, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";
import { Input } from '@rneui/themed';
import { styles } from "../assets/styles/index";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleLogin() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (!error) {
        setLoading(false);
        alert("Login successful. Redirect to home page");
        navigation.navigate("Home");
      } else {
        setLoading(false);
        alert(error.message);
      }
    } catch (error) {
      setLoading(false);
      alert("An unexpected error occurred.");
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome Back!</Text>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button
        title={loading ? "Loading" : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
      <View style={{ marginVertical: 10 }} />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PetProfile");
          }}
        >
          <Text style={{ color: "blue" }}>Go to pet profile page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}