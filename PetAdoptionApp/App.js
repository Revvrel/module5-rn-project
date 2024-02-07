import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { supabase } from "./lib/supabase";
import PetProfile from "./screens/Pet/PetProfile";
import Account from './components/Account';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session || !session.user ? (
          // Screen for logged in users only
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          </Stack.Group>
        ) : (
          //{(props) => <Account {...props} session={session} />}
          //</Stack.Screen>
          // Authentication Screen
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
