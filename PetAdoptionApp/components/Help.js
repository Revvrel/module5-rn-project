import React from "react";
import { Text, View } from "react-native";
import { version } from "../package.json";

export default function Help() {

  console.log(version.version);

  return (
    <View>
      <Text>Help Page</Text>
    </View>
  );
}
