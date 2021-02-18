import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
const { width } = Dimensions.get("screen");
import { Block, Button, theme } from "galio-framework";
import fetchCall from "../../Fetch";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Button as ButtonNew } from "../individual_components";
import Swipeable from "react-native-swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../../App";
import SearchBar from "../screens/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
const fetchReq = new fetchCall();

export default function SingleTripCard({ route, navigation }) {
  const TripsContext = useContext(Context);
  const [trip, setTrip] = useState(route.params.trip);
  const [checkpoints, setCheckpoints] = useState(route.params.trip.checkpoints);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  });

  const getCurrentUser = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("currentUser");
      if (jsonValue !== null) {
        jsonValue = JSON.parse(jsonValue);
        setUser(jsonValue.user.id);
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  function deleteCheckpoint(id) {
    let a = checkpoints.filter(chp => {
      return chp.id !== id;
    });
    fetchReq.generalFetch(
      `http://localhost:3000/api/v1/checkpoints/${id}`,
      fetchReq.makeOptions("DELETE")
    );
    setCheckpoints(a);
    TripsContext.testing(trip.id, a);
  }

  return (
    <>
      <SearchBar location={trip.destination_name} />
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.articles}
        >
          <Block flex>
            <Block>
              <Card item={trip} full key={trip.id} />
            </Block>
            {checkpoints ? (
              <Block flex>
                {checkpoints.map(checkpoint => {
                  return (
                    <Block flex>
                      {user === trip.user_id ? (
                        <Swipeable
                          rightButtons={[
                            <TouchableOpacity
                              onPress={() => {
                                deleteCheckpoint(checkpoint.id);
                              }}
                            >
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
                          ]}
                        >
                          <Card
                            item={checkpoint}
                            horizontal
                            key={checkpoint.id}
                          />
                        </Swipeable>
                      ) : (
                        <Card
                          item={checkpoint}
                          horizontal
                          key={checkpoint.id}
                        />
                      )}
                    </Block>
                  );
                })}
              </Block>
            ) : null}
          </Block>
          <Block flex style={styles.button}>
            {user === trip.user_id ? (
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
            ) : null}
          </Block>
        </ScrollView>
      </Block>
    </>
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
