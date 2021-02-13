import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import LoginScreen from "./src/login/login";
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
  const [allTrips, setAllTrips] = useState([]);
  const fetchAllTrips = () => {
    fetchReq.generalFetch(URL).then(trips => {
      setAllTrips(trips);
    });
  };

  useEffect(() => {
    fetchAllTrips();
  }, []);

  const updateTrips = trip => setAllTrips(allTrips, allTrips.push(trip));
  const addCheckpoint = checkpoint => {
    // const updatedTrip = allTrips.filter(trip => {
    //   trip.id === checkpoint["trip_id"];
    // });
    // updatedTrip.checkpoints.push(checkpoint);
    // return setAllTrips(allTrips, updatedTrip);
    console.log(allTrips);
  };

  const testingIt = {
    allTrips,
    addTrip: updateTrips,
    addCheckpoint,
  };

  return (
    <Context.Provider value={testingIt}>
      <NavigationContainer initialRouteName='Login'>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={MyTabs} />
          <Stack.Screen name='SignUp' component={Register} />
          <Stack.Screen name='Trip' component={SingleTripCard} />
          <Stack.Screen name='Add checkpoint' component={FormCheckpoint} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
export default App;
