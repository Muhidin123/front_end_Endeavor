import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = props => {
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
      latitude: midLat,
      longitude: midLng,
      latitudeDelta: deltaLat,
      longitudeDelta: deltaLng,
    };
  };
  return (
    <GooglePlacesAutocomplete
      placeholder='Destination name'
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
          regionContainingPoints(fullCoordinates)
        );
      }}
      query={{
        key: "AIzaSyBzE6t1NxMR9_098BPR87Az7QeVPxNEa28",
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
