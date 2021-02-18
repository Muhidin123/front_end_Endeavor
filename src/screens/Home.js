import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, View, LogBox } from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../individual_components";
import { Context } from "../../App";
import { SearchBar } from "react-native-elements";
const { width } = Dimensions.get("screen");

LogBox.ignoreLogs([
  "Warning: Failed prop type: The prop `coordinate.latitude` is marked as required in `MapMarker`, but its value is `undefined`.",
]);

function Home() {
  const ALL_FETCHED_TRIPS = useContext(Context);
  const [trips, _setTrips] = useState(ALL_FETCHED_TRIPS.allTrips);
  const [input, setInput] = useState("");

  function SearchBarComponent() {
    return (
      <SearchBar
        placeholder='Search...'
        onChangeText={text => setInput(text.toLowerCase())}
        value={input}
        lightTheme={true}
        round={true}
        containerStyle={{ borderRadius: 21.5, height: 50 }}
        inputContainerStyle={{ backgroundColor: "white" }}
        platform='ios'
        inputStyle={{ backgroundColor: "white" }}
      />
    );
  }

  const filteredTrips = trips.filter(trip => {
    return (
      trip.title.toLowerCase().includes(input) ||
      trip.note.toLowerCase().includes(input) ||
      trip["destination_name"].toLowerCase().includes(input)
    );
  });

  const renderTrips = () => {
    return (
      <View>
        {SearchBarComponent()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
            {filteredTrips.map(trip => {
              return <Card item={trip} horizontal key={trip.id} />;
            })}
          </Block>
        </ScrollView>
      </View>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderTrips()}
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
  },
});

export default Home;
