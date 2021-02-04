import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../map/Map";
import Home from "./Home";
import GoogleSearch from "../search/search";

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator labeled={false}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Map'
        component={Map}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='google-maps'
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={GoogleSearch}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='magnify' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
