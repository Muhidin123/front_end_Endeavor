import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./src/login/Login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import fetchCall from "./Fetch";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MyTabs from "./src/screens/BottomTab.js";
import Register from "./src/screens/Register.js";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();
const fetchReq = new fetchCall();

URL = "http://localhost:3000/api/v1/trips";

export const Context = createContext(null);
function App() {
  const [allTrips, setAllTrips] = useState(null);
  const fetchAllTrips = () => {
    fetchReq.generalFetch(URL).then(trips => {
      let a = trips;
      setAllTrips(a);
    });
  };

  useEffect(() => {
    fetchAllTrips();
  }, []);

  return (
    <Context.Provider value={allTrips}>
      <NavigationContainer initialRouteName='Login'>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={MyTabs} />
          <Stack.Screen name='SignUp' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
const styles = StyleSheet.create({});
export default App;
