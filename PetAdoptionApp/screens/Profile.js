import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles/index.js";
import ProfilePic from "./ProfilePic.js";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phone, setPhone] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [changePasswordButtonVisible, setChangePasswordButtonVisible] =
    useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function fetchSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setSession(session);
    setUsername(user.user_metadata.username);
    setEmail(user.email);
    setFullName(user.user_metadata.fullName);
    setDateOfBirth(user.user_metadata.dateOfBirth);
    setPhone(user.phone);
    // console.log(user);
  }

  async function getProfile() {
    try {
      setLoading(true);
      if (!session) {
        console.error("No active session");
        return;
      }

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        console.log(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.navigate("BlankPage");
    }
    if (error) {
      alert(error.message);
    }
  }

  async function handleUpdateUser() {
    if (!session) {
      console.error("No active session");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Password not match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        phone: phone,
        password: newPassword,
        data: { fullName: fullName },
      });
      if (error) {
        throw error;
      }
      alert("Success", "Profile updated successfully");
      setShowPasswordInputs(false);
      setChangePasswordButtonVisible(true);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleChangePassword = () => {
    setShowPasswordInputs(true);
    setChangePasswordButtonVisible(false);
  };

  return (
    <ScrollView>
      <View style={{ marginVertical: 10 }} />
      <Text style={styles.h1}>{username} Profile</Text>
      <View>
        <ProfilePic
          size={200}
          url={avatarUrl}
          onUpload={(url) => {
            setAvatarUrl(url);
            // updateProfile({ username, website, avatar_url: url });
          }}
        />
      </View>
      <View style={{ marginVertical: 10 }} />
      <Text>Full Name</Text>
      <TextInput
        value={fullName}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={setFullName}
        style={styles.input}
      />
      <View style={{ marginVertical: 10 }} />
      <Text>Email</Text>
      <TextInput value={email} editable={false} style={styles.input} />
      <View style={{ marginVertical: 10 }} />
      <Text>Phone</Text>
      <TextInput
        value={phone}
        autoComplete="off"
        autoCorrect={false}
        onChangeText={setPhone}
        style={styles.input}
      />
      <View style={{ marginVertical: 10 }} />
      <Text>Date Of Birth</Text>
      <TextInput value={dateOfBirth} editable={false} style={styles.input} />
      <View style={{ marginVertical: 10 }} />
      {showPasswordInputs && (
        <View>
          <Text>Change Password</Text>
          <TextInput
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
      )}
      {changePasswordButtonVisible && (
        <Button
          title="Change Password"
          onPress={handleChangePassword}
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
      )}
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Update"
        onPress={handleUpdateUser}
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
      <Button
        title="Logout"
        onPress={handleLogout}
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
    </ScrollView>
  );
}
