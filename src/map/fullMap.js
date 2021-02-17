import React, { useContext, useEffect } from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
// import { Button as ButtonNew } from "../individual_components";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Context } from "../../App";

import MapView, { Callout, CalloutSubview } from "react-native-maps";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

export default function FullMap({ navigation }) {
  const markerCoordinates = useContext(Context);

  // useEffect(() => {
  //   getCurrentUser();
  // }, []);
  // const getCurrentUser = async () => {
  //   try {
  //     let jsonValue = await AsyncStorage.getItem("currentUser");
  //     if (jsonValue !== null) {
  //       jsonValue = JSON.parse(jsonValue);
  //     }
  //   } catch (e) {
  //     console.log("ERROR", e);
  //   }
  // };

  const onMarkerPress = trip => {
    navigation.navigate("Trip", {
      trip,
    });
  };

  return (
    <MapView
      style={{ flex: 1, position: "relative" }}
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}
    >
      {markerCoordinates.allTrips.map((marker, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: marker.latitude_delta,
              longitudeDelta: marker.longitude_delta,
            }}
          >
            <Callout onPress={() => onMarkerPress(marker)}>
              <View style={{ height: 200, width: 200, borderRadius: 30 }}>
                <Image
                  style={{ flex: 1, borderRadius: 10 }}
                  source={{
                    uri: marker.image,
                  }}
                />
                <TouchableWithoutFeedback
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "#f96332" }}>
                    {marker.destination_name}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "relative",
  },
});
