import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (password !== confirmPassword) {
      setLoading(false);
      alert("Password not same as confirm password");
    } else {
      if (!error) {
        setLoading(false);
        alert("Registration successful. Redirect to login page");        
        navigation.navigate("Login");
      }
      if (error) {
        setLoading(false);
        alert(error.message);
      }
    }
  }
  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Enter your password"
        value={password}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm your password"
        value={confirmPassword}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        title={loading ? "Loading" : "Create an account"}
        onPress={handleRegister}
        disabled={loading}
      />   
    </View>
  );
}
