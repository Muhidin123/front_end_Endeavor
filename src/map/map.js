import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";

export default function Map({ fullCoordinates }) {
  const regionContainingPoints = points => {
    let minLat, maxLat, minLng, maxLng;

    // init first point
    (point => {
      minLat = point.lat;
      maxLat = point.lat;
      minLng = point.lng;
      maxLng = point.lng;
    })(points[0]);

    // calculate rect
    points.forEach(point => {
      minLat = Math.min(minLat, point.lat);
      maxLat = Math.max(maxLat, point.lat);
      minLng = Math.min(minLng, point.lng);
      maxLng = Math.max(maxLng, point.lng);
    });

    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;

    const deltaLat = maxLat - minLat;
    const deltaLng = maxLng - minLng;

    return {
      lat: midLat,
      lng: midLng,
      latDelta: deltaLat,
      lngDelta: deltaLng,
    };
  };

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
          latitude: regionContainingPoints(fullCoordinates).lat,
          longitude: regionContainingPoints(fullCoordinates).lng,
          latitudeDelta: regionContainingPoints(fullCoordinates).latDelta,
          longitudeDelta: regionContainingPoints(fullCoordinates).lngDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude: regionContainingPoints(fullCoordinates).lat,
            longitude: regionContainingPoints(fullCoordinates).lng,
            latitudeDelta: regionContainingPoints(fullCoordinates).latDelta,
            longitudeDelta: regionContainingPoints(fullCoordinates).lngDelta,
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
