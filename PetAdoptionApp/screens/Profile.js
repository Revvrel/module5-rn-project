import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phone, setPhone] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const { data: { session } } = await supabase.auth.getSession();
    const { data: { user } } = await supabase.auth.getUser();
    setSession(session);
    setUsername(user.user_metadata.username);
    setEmail(user.email);
    setFullName(user.user_metadata.fullName);
    setDateOfBirth(user.user_metadata.dateOfBirth);
    setPhone(user.phone);
    console.log(user);
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

  return (
    <View>
      <View style={{ marginVertical: 10 }} />
      <Text>{username} Profile</Text>
      <View style={{ marginVertical: 10 }} />
      <Text>Full Name</Text>
      <TextInput value={fullName} editable={false}/>
      <View style={{ marginVertical: 10 }} />
      <Text>Email</Text>
      <TextInput value={email} editable={false}/>
      <View style={{ marginVertical: 10 }} />
      <Text>Phone</Text>
      <TextInput value={phone} editable={false}/>
      <View style={{ marginVertical: 10 }} />
      <Text>Date Of Birth</Text>
      <TextInput value={dateOfBirth} editable={false}/>
      <View style={{ marginVertical: 10 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
