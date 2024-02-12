import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

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
    const {error} = await supabase.auth.verifyOtp({email:email, token:verificationCode, type:'email'});
    if (error) {
      Alert.alert("Error", error.message);
      return;
    }
    setShowPasswordInputs(true);
    Alert.alert("Success", "OTP successful");
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
        onPress={handleForgetPassword}
        disabled={loading}
      />
      {showVerificationInput && (
        <View>
          <TextInput
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            keyboardType="numeric"
          />
          <Button
            title="Verify OTP"
            onPress={handleVerifyOTP}
            disabled={!verificationCode}
          />
        </View>
      )}
      {showPasswordInputs && (
        <View>
          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
          <Button
            title="Change Password"
            onPress={handleChangePassword}
            disabled={!newPassword || !confirmPassword}
          />
        </View>
      )}
    </View>
  );
}