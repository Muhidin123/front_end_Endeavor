import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      onPress={(data, details) => {
        console.log(details);
        props.handleDestination(details.geometry.location, data.description);
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
          height: 40
        },
      }}
    />
  );
};

export default GooglePlacesInput;
