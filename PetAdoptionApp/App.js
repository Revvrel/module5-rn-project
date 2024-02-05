import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Account from "./components/Account";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";

const Stack = createStackNavigator();

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
      {session && session.user ? (
          <Stack.Screen name="Account">
            {(props) => <Account {...props} session={session} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="Go to HomePage" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
