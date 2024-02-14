import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Matches, Messages, Profile, SwipeHome } from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import Help from "./Help";
import CameraTest from "./CameraTest";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function fetchSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  setSession(session);
  console.log(session.user.email);
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "SwipeHome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Matches") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Messages") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Help") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } else if (route.name === "CameraTest") {
            iconName = focused ? "camera" : "camera-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
      })}
    >
      <Tab.Screen name="SwipeHome" component={SwipeHome} />
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="CameraTest" component={CameraTest} />
    </Tab.Navigator>
  );
}

export default function Home() {

  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
        options={{
          title: "Furever Home",
          headerTitleAlign: "center",
          headerRight: () => (
            <Ionicons
              name="settings-outline"
              size={25}
              color="blue"
              onPress={() => {
                navigation.navigate("Settings");
              }}
              style={{ marginRight: 10 }}
            />
          ),
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}
