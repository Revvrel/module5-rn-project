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
import PetInfo from "./screens/Pet/PetInfo";
import Settings from "./components/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import WelcomeScreen from "./components/WelcomeScreen";
import BlankPage from "./components/BlankPage";
import CameraTest from "./components/CameraTest";
import * as Font from 'expo-font';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Bold': require("./assets/fonts/Poppins-Bold.ttf"),
        'Poppins-Regular': require("./assets/fonts/Poppins-Regular.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (showSplash || !fontLoaded) {
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
              } else if (route.name === "Forget Password") {
                iconName = focused ? "lock-closed" : "lock-closed-outline";
              } else if (route.name === "Help") {
                iconName = focused ? "help-circle" : "help-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#4B413E",
            tabBarInactiveTintColor: "#B6A6A1",
          })}
        >
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Forget Password" component={ForgetPassword} />
          <Tab.Screen name="Help" component={Help} />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ tabBarButton: () => null }}
          />          
          <Tab.Screen
            name="PetInfo"
            component={PetInfo}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="PetProfile"
            component={PetProfile}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="BlankPage"
            component={BlankPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="CameraTest" component={CameraTest} />
          <Stack.Screen name="PetInfo" component={PetInfo} />
          <Stack.Screen name="PetProfile" component={PetProfile} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
