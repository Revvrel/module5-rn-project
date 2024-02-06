import React from "react";
import { Text, View, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";


export default function Profile() {

    const navigation = useNavigation();

  return (
    <View>
      <Text>Profile Screen!</Text>
      <Button
        title="Logout"
        onPress={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            alert("Signed Out");
            navigation.navigate("Login");
          }
          if (error) {
            alert(error.message);
          }
        }}
      />
    </View>
  );
}
