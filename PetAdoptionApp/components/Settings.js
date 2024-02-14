import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../assets/styles/index.js";

export default function Settings() {
  const [session, setSession] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchSession();
  }, []);

  async function fetchSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
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
      <Text>Settings Screen!</Text>

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
    </View>
  );
}
