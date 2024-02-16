import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Text, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';

import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";
import { Input } from '@rneui/themed';
import { styles } from "../assets/styles/index.js";
import { useFonts } from 'expo-font'; // Import useFonts from expo-font

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
      <View style={{textAlign: 'center', flexDirection: 'row',justifyContent: 'flex-end' }}>
   
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Forget Password");
          }}
        >
          <Text style={{color: '#B6A6A1', fontSize: 12, paddingRight: 20, marginBottom: 15}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title={loading ? "Loading" : "Login"}
        onPress={handleLogin}
        disabled={loading}
        buttonStyle={{
          backgroundColor: '#FFB197',
          borderRadius: 50,
          padding: 15,
          height: 55,
        }}
        containerStyle={{
          width: 150,
          justifyContent: 'center',
          marginHorizontal: 120,
          marginVertical: 10,
        }}
      />
      <View style={{ marginVertical: 10 }} />
      <View style={{textAlign: 'center', flexDirection: 'row',justifyContent: 'center' }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.link}>Sign Up Now!</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }} />
      


      <View style={{paddingTop: 30}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PetInfo");
          }}
        >
          <Text style={[styles.link, {textAlign: 'center'}]}>Create a pet profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}