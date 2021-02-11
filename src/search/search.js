import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search For a place'
      fetchDetails={true}
      onPress={(data, details) => {
        let fullCoordinates = [
          details.geometry.location,
          details.geometry.viewport.northeast,
          details.geometry.viewport.southwest,
        ];
        props.handleDestination(
          details.geometry,
          data.description,
          fullCoordinates
        );
      }}
      query={{
        key: "AIzaSyBCHL973nJXtWHQC8l5TsMPOm6wD-zhMdE",
        language: "en",
      }}
      styles={{
        textInput: {
          marginTop: 5,
          flex: 1,
          borderRadius: 21.5,
          height: 40,
        },
      }}
    />
  );
};

export default GooglePlacesInput;
