import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Button, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";
import PetProfile from "../screens/Pet/PetProfile";

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
        <Text size="md">Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text>Click here to create a new account</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }} />
      <View>
        <Text size="md">Forget Password?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgetPassword");
          }}
        >
          <Text>Click here to reset password</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PetProfile");
          }}
        >
          <Text style={{color:'blue'}}>Go to pet profile page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
