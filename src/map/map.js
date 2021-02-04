import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Text, Button } from "react-native";
import { useState } from "react";

export default function Map({ navigation }) {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const handlePress = e => {
    console.log(e);
    setLongitude(e.longitude);
    setLatitude(e.latitude);
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
        initialRegion={{
          latitude: 41.98028,
          longitude: -87.9089979,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={e => {
          handlePress(e.nativeEvent.coordinate);
        }}
      >
        <Marker
          coordinate={{
            longitude,
            latitude,
          }}
        />
      </MapView>
      <View>
        <Button
          onPress={() => {
            navigation.push("Home");
          }}
          title='Search'
        ></Button>
      </View>
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
