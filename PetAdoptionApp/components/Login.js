import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Button, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";

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
        alert("Login successful. Welcome " + email);
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
      <TextInput
        placeholder="Enter your password"
        value={password}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
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
