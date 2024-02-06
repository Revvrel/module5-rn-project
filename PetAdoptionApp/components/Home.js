import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Matches, Messages, Profile, SwipeHome } from "../screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SwipeHome" component={SwipeHome} />
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={HomeTabNavigator}
        options={{ headerShown: false, animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}

// const Home = () => {
//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Tab"
//           options={{ headerShown: false, animationEnabled: false }}
//         >
//           {() => (
//             <Tab.Navigator>
//               <Tab.Screen
//                 name="SwipeHome"
//                 component={SwipeHome}

//               />

//               <Tab.Screen
//                 name="Matches"
//                 component={Matches}

//               />

//               <Tab.Screen
//                 name="Messages"
//                 component={Messages}
//               />

//               <Tab.Screen
//                 name="Profile"
//                 component={Profile}

//               />
//             </Tab.Navigator>
//           )}
//         </Stack.Screen>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );

// }
