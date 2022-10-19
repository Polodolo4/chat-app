import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react native gesture handler
import "react-native-gesture-handler";

// import react Navigation
//import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
