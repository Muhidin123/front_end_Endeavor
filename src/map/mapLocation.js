import * as React from "react";
import { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

export default function Location({ route }) {
  const [coordinates, setCoordinates] = React.useState(
    route.params.fullCoordinates
  );

  const handleOpenWithWebBrowser = () => {
    // WebBrowser.openBrowserAsync(
    //   "http://maps.apple.com/?daddr=San+Francisco&dirflg=d&t=h="
    // );
    console.log("OPEN MAPS");
  };

  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    image,
  } = coordinates;

  console.log(image);
  return (
    <MapView
      style={{ flex: 1, position: "relative" }}
      initialRegion={{
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
      >
        <Callout>
          <View style={{ height: 200, width: 200 }}>
            {/* <Image
              style={{ flex: 1 }}
              source={{
                uri: image,
              }}
            /> */}
            <Button title='Get directions' onPress={handleOpenWithWebBrowser} />
          </View>
        </Callout>
      </Marker>
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
