import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/Help";
import { supabase } from "./lib/supabase";
import PetProfile from "./screens/Pet/PetProfile";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "./components/WelcomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (showSplash) {
    return <WelcomeScreen />;
  }

  return (
    <NavigationContainer>
      {!session || !session.user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Login") {
                iconName = focused ? "log-in" : "log-in-outline";
              } else if (route.name === "Register") {
                iconName = focused ? "create" : "create-outline";
              } else if (route.name === "ForgetPassword") {
                iconName = focused ? "lock-closed" : "lock-closed-outline";
              } else if (route.name === "Help") {
                iconName = focused ? "help-circle" : "help-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "blue",
          })}
        >
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="ForgetPassword" component={ForgetPassword} />
          <Tab.Screen name="Help" component={Help} />
          <Tab.Screen
            name="PetProfile"
            component={PetProfile}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="PetProfile" component={PetProfile} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
