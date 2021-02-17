import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";

export default function Map({ fullCoordinates }) {
  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  } = fullCoordinates;
  return (
    <View style={styles.container}>
      <MapView
        showsMyLocationButton={true}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        userLocationAnnotationTitle='Muhidin Hukic'
        loadingBackgroundColor='#fff'
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        />
      </MapView>
    </View>
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
    height: Dimensions.get("window").height / 2,
    position: "relative",
  },
});
