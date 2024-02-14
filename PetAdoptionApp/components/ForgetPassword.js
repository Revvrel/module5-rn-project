import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles/index.js";
import { Button } from "@rneui/themed";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);

  const navigation = useNavigation();

  async function handleForgetPassword() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
      setShowVerificationInput(true);
      Alert.alert("Success", "Password reset email sent successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP() {
    const {data, error} = await supabase.auth.verifyOtp({email:email, token:verificationCode, type:'email'});
    
    if (error) {
      Alert.alert("Error", error.message);
      return;
    } 
    Alert.alert("Success", "OTP verification successful. Please proceed to change your password at the Profile Page.");
  }

  async function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      Alert.alert("Password not match");
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }
      Alert.alert("Success", "Password updated successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Recover your {"\n"} Password</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
         style={styles.input}
      />

      <View style={{ marginVertical: 10 }} />


      <Button
        title={loading ? "Loading" : "Send email"}
        onPress={handleForgetPassword}
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
      {showVerificationInput && (
        <View>
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            keyboardType="numeric"
          />
      
<View style={{ marginVertical: 10 }} />
          <Button
            title="Verify OTP"
            onPress={handleVerifyOTP}
            disabled={!verificationCode}
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
        </View>
      )}
    </View>
  );
}