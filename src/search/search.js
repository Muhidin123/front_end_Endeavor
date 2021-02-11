import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search For a destination'
      fetchDetails={true}
      onPress={(data, details) => {
        let fullCoordinates = [
          details.geometry.location,
          details.geometry.viewport.northeast,
          details.geometry.viewport.southwest,
        ];
        // console.log(details);
        console.log(fullCoordinates);
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

// "geometry": Object {
//   "location": Object {
//     "lat": 41.8781136,
//     "lng": -87.6297982,
//   },
//   "viewport": Object {
//     "northeast": Object {
//       "lat": 42.02313101768388,
//       "lng": -87.52366097503476,
//     },
//     "southwest": Object {
//       "lat": 41.64433494650358,
//       "lng": -87.94026693316636,
//     },
//   },
// },
