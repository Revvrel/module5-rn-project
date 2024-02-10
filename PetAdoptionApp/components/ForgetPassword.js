import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleForgetPassword() {
    setLoading(true);
    const { data, error } = supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.google.com",
    });
    console.log(data);
    if (!error) {
      setLoading(false);
      alert("Password reset email sent. Check your email inbox.");
      navigation.navigate("Login");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        value={email}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title={loading ? "Loading" : "Send email"}
        onPress={() => {
          handleForgetPassword();
        }}
        disabled={loading}
      />
    </View>
  );
}
