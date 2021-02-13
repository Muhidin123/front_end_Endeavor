import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
const { width } = Dimensions.get("screen");
import { Block, Button, Text, theme } from "galio-framework";
import fetchCall from "../../Fetch";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Button as ButtonNew } from "../individual_components";
import Swipeable from "react-native-swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LogBox } from "react-native";

const fetchReq = new fetchCall();

export default function SingleTripCard({ route, navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`", "Animated.event"]);
  }, []);

  const test = () => {
    console.log("CONTEXT UPDATE");
  };
  const rightButtons = [
    <TouchableOpacity style={{ backgrondColor: "red" }}>
      <Button
        color='red'
        style={{
          marginTop: 17,
          height: 119,
          width: 60,
        }}
      >
        Delete
      </Button>
    </TouchableOpacity>,
  ];

  const trip = route.params.trip;
  let checkpoints = trip.checkpoints;

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Block>
            <Card item={trip} full key={trip.id} />
          </Block>
          <Block flex>
            {checkpoints.map(checkpoint => {
              return (
                <Block flex>
                  <Swipeable useNativeDriver={true} rightButtons={rightButtons}>
                    <Card item={checkpoint} horizontal key={checkpoint.id} />
                  </Swipeable>
                </Block>
              );
            })}
          </Block>
        </Block>
        <Block flex style={styles.button}>
          <ButtonNew
            small={true}
            style={styles.button}
            color='info'
            onPress={() =>
              navigation.navigate("Add checkpoint", {
                itemId: trip.id,
              })
            }
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
    backgroundColor: "white",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    borderColor: "black",
  },
  button: {
    borderColor: "black",
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
