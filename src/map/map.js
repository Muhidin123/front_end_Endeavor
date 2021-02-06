import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";

export default function Map({ coordinates, navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
        initialRegion={{
          latitude: 1,
          longitude: 1,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        }}
      >
        <Marker
          coordinate={{
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
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
    height: Dimensions.get("window").height / 2.5,
    position: "relative",
  },
});
