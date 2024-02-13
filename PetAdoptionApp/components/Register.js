import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { styles } from "../assets/styles/index.js";
import { Button } from '@rneui/themed';

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
    <View style={styles.container}>
      <Text style={styles.h1}>Register to get started!</Text>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        autoComplete="off"
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
      <TextInput
        placeholder="Confirm your password"
        value={confirmPassword}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
      />
      <Button
        title={loading ? "Loading" : "Create an account"}
        onPress={handleRegister}
        disabled={loading}
        buttonStyle={{
                backgroundColor: '#FFB197',
          borderRadius: 50,
          padding: 15,
          height: 55,
              }}
        containerStyle={{
          width: 200,
          justifyContent: 'center',
          marginHorizontal: 90,
                marginVertical: 10,
              }}
      />   

      <View style={{ marginVertical: 10 }} />
      <View style={{textAlign: 'center', flexDirection: 'row',justifyContent: 'center' }}>
        <Text style={{ fontSize: 16 }}>Have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
