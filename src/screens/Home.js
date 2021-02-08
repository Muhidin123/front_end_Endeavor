import React, { useContext, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, LogBox } from "react-native";
import { Block, theme } from "galio-framework";
import { Card } from "../individual_components";
import { Context } from "../../App";
const { width } = Dimensions.get("screen");

function Home() {
  const ALL_FETCHED_TRIPS = useContext(Context);

  const [input, setInput] = useState("");
  const [tripsFiltered, setTripsFiltered] = useState(ALL_FETCHED_TRIPS);

  tripsFiltered.filter(trip => {
    return trip.title.toLowerCase() === input.toLowerCase();
  });
  const renderTrips = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
            {tripsFiltered.map(trip => {
              return <Card item={trip} horizontal key={trip.id} />;
            })}
          </Block>
        </ScrollView>
      </>
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
