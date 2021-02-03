import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

export default function GoogleSearch() {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details.geometry.location);
          console.log(details);
        }}
        enablePoweredByContainer={true}
        query={{
          key: "AIzaSyBCHL973nJXtWHQC8l5TsMPOm6wD-zhMdE",
          language: "en",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
});
