import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
const { width } = Dimensions.get("screen");
import { Block, theme } from "galio-framework";
import fetchCall from "../../Fetch";
import { Card } from "../individual_components";

const fetchReq = new fetchCall();

export default function SingleTripCard({ route }) {
  const trip = route.params.trip;

  const getSingleTrip = () => {};
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Card item={trip} full key={trip.id} />
        </Block>
      </ScrollView>
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
