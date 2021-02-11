import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import LoginScreen from "./src/login/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import fetchCall from "./Fetch";
import MyTabs from "./src/screens/BottomTab.js";
import Register from "./src/screens/Register.js";
import SingleTripCard from "./src/screens/SingleTrip.js";
import FormCheckpoint from "./src/form/FormCheckpoint.js";

LogBox.ignoreLogs([
  "Require cycle: App.js -> src/screens/BottomTab.js -> src/screens/Home.js -> App.js",
]);

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
          <Stack.Screen name='SingleTripCard' component={SingleTripCard} />
          <Stack.Screen name='NewCheckpointForm' component={FormCheckpoint} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
export default App;
