import React from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
const { width } = Dimensions.get("screen");
import { Block, theme } from "galio-framework";
import fetchCall from "../../Fetch";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Button as ButtonNew } from "../individual_components";

const fetchReq = new fetchCall();

export default function SingleTripCard({ route, navigation }) {
  const trip = route.params.trip;
  const checkpoints = trip.checkpoints;

  console.log(trip);

  const getSingleTrip = () => {};
  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Block>
            <Card item={trip} full key={trip.id} />
          </Block>
          <Block flex>
            {checkpoints.map(checkpoint => {
              return <Card item={checkpoint} horizontal key={checkpoint.id} />;
            })}
          </Block>
        </Block>
        <Block flex style={styles.button}>
          <ButtonNew
            small={true}
            style={styles.button}
            color='info'
            onPress={() => {
              navigation.push("NewCheckpointForm");
            }}
          >
            <MaterialCommunityIcons name='plus' size={24} />
          </ButtonNew>
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
  button: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
