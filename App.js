// import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/login/login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Map from "./src/map/map.js";
import GoogleSearch from "./src/search/search.js";
import Tabs from "./src/now-ui-react-native-master/components/Tabs.js";
import Register from "./src/now-ui-react-native-master/screens/Register.js";
import Home from "./src/now-ui-react-native-master/screens/Home.js";
// import Card from "./src/now-ui-react-native-master/components/Card.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={LoginScreen} />
        <Stack.Screen name='Welcome' component={Map} />
        <Stack.Screen name='Search' component={Tabs} />
        <Stack.Screen name='SignUp' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
