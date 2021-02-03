// import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/login/login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Map from "./src/map/map.js";
import Tabs from "./src/now-ui-react-native-master/components/Tabs.js";
import Register from "./src/now-ui-react-native-master/screens/Register.js";
import Home from "./src/now-ui-react-native-master/screens/Home.js";
import fetchCall from "./Fetch";
import GoogleSearch from "./src/search/search.js";

const Stack = createStackNavigator();
const fetchReq = new fetchCall();

const test = {
  title: "Test context",
  image: require("./src/now-ui-react-native-master/assets/imgs/project13.jpg"),
  cta: "Test context",
  horizontal: true,
};

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Welcome' component={Map} />
          <Stack.Screen name='Search' component={Tabs} />
          <Stack.Screen name='SignUp' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
export default App;
const styles = StyleSheet.create({});
