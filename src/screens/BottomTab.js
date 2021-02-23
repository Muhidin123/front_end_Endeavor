import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Form from "../form/Form";
import Home from "../screens/Home";
import LoginScreen from "../login/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FullMap from "../map/fullMap";
import Favorites from "./Favorites";
const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({ navigation }) {
  const removeCurrentUserOnLogout = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <Tab.Navigator
      labeled={true}
      barStyle={{
        marginTop: 0,
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Add a trip'
        component={Form}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='plus' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Map'
        component={FullMap}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='map' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='heart' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: e => {
            removeCurrentUserOnLogout();
          },
        }}
        name='Logout'
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-remove-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
