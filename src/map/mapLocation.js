import * as React from "react";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Image, Button } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Callout,
  CalloutSubview,
} from "react-native-maps";
import * as WebBrowser from "expo-web-browser";

export default function Location({ route }) {
  const [coordinates, setCoordinates] = React.useState(
    route.params.fullCoordinates
  );

  let directionsTo = route.params.name.split(" ").map(elem => {
    return elem.replace(",", "");
  });
  directionsTo = directionsTo.join("+");

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(
      `http://maps.apple.com/?daddr=${directionsTo}&dirflg=d&t=h`
    );
  };

  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
    image,
  } = coordinates;

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
            <Image
              style={{ flex: 1 }}
              source={{
                uri: image,
              }}
            />
            <CalloutSubview onPress={handleOpenWithWebBrowser}>
              <Button title='Get directions' />
            </CalloutSubview>
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
