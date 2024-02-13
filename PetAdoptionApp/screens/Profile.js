import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [session, setSession] = useState(null);
  const navigation = useNavigation();

  // useEffect(() => {
  //   fetchSession();
  // }, []);

  // async function fetchSession() {
  //   const { data: { session } } = await supabase.auth.getSession();
  //   const { data: { user } } = await supabase.auth.getUser();
  //   setSession(session);
  //   console.log("User ", user);
  // }

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
      <Text>Welcome</Text>
      {/* <Text>Welcome, {session.user.email}</Text> */}
      <View style={{ marginVertical: 10 }} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
