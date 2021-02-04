import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./src/login/login.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Map from "./src/map/map.js";
import Register from "./src/now-ui-react-native-master/screens/Register.js";
import Home from "./src/now-ui-react-native-master/screens/Home.js";
import fetchCall from "./Fetch";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyTabs from "./src/now-ui-react-native-master/screens/BottomTab.js";
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
        {/* <Tab.Navigator>
          <Tab.Screen name='Login' component={LoginScreen} />
          <Tab.Screen name='Home' component={Home} />
        </Tab.Navigator> */}
        <Stack.Navigator>
          {/* <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Welcome' component={Map} />
          <Stack.Screen name='Search' component={Profile} />
          <Stack.Screen name='SignUp' component={Register} /> */}
          {/* <Tab.Screen
            name='Home'
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name='home' color={color} size={26} />
              ),
            }}
          /> */}
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
export default App;
const styles = StyleSheet.create({});
