import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Block, Text } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button as ButtonSubmit, Icon, Input } from "../individual_components";
import { nowTheme } from "../constants/index";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import GooglePlacesInput from "../search/search";
const { width, height } = Dimensions.get("screen");
import Map from "../map/map";
import fetchCall from "../../Fetch";
let fetchReq = new fetchCall();
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerExample from "../image_upload/imageUpload";
const URL_POST_REQ_TRIP = "http://localhost:3000/api/v1/trips";
import { Context } from "../../App";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Form({ navigation }) {
  const TripsContext = useContext(Context);
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("currentUser");
      if (jsonValue !== null) {
        jsonValue = JSON.parse(jsonValue);
        return setForm({ ...form, user_id: jsonValue.user.id });
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };
  const handleSubmit = e => {
    fetchReq
      .generalFetch(
        URL_POST_REQ_TRIP,
        fetchReq.makeOptions("POST", { trip: e })
      )
      .then(data => {
        console.log(data);
        TripsContext.addTrip(data);
        navigation.push("Home");
      });
  };

  const handleImage = image => {
    let name = image.uri.split("/");
    name = name[name.length - 1];
    setForm({ ...form, image: image.base64, file_name: name });
  };

  const initialState = {
    title: "",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    destination_name: "",
    latitude: 0,
    longitude: 0,
    latitude_delta: 0,
    longitude_delta: 0,
    user_id: null,
    public: true,
    image: null,
  };

  const [form, setForm] = useState(initialState);
  const [fullCoordinates, setFullcoordinates] = useState([{ lat: 0, lng: 0 }]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDestination = (e, name, fullCoordinates, deltas) => {
    setForm({
      ...form,
      latitude: deltas.lat,
      longitude: deltas.lng,
      latitude_delta: deltas.latDelta,
      longitude_delta: deltas.lngDelta,
      destination_name: name,
    });
    console.log("DELTAS", deltas);
    console.log("FULL COORDINATES", fullCoordinates);
    setFullcoordinates(fullCoordinates);
  };

  const setStart = (_event, date) => {
    setForm({
      ...form,
      start: date.toISOString(),
    });
    setStartDate(date);
  };
  const setEnd = (_event, date) => {
    setForm({
      ...form,
      end: date.toISOString(),
    });
    setEndDate(date);
  };
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
      <DismissKeyboard keyboardShouldPersistTaps={"handled"}>
        <Block flex middle keyboardShouldPersistTaps={"handled"}>
          <Block flex middle keyboardShouldPersistTaps={"handled"}>
            <Block
              flex={0.4}
              middle
              style={styles.socialConnect}
              keyboardShouldPersistTaps={"handled"}
            >
              <Block flex={0.5} middle keyboardShouldPersistTaps={"handled"}>
                {/* ADD TEXT TO HEADER FORM HERE */}
              </Block>
              <Block
                flex={0.5}
                row
                middle
                space='between'
                style={{ marginBottom: 18 }}
                keyboardShouldPersistTaps={"handled"}
              ></Block>
            </Block>
            <Block flex={0.1} middle></Block>
            <Block flex={1} middle space='between'>
              <Block center flex={0.9}>
                <Block flex space='between'>
                  <Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        placeholder='Title'
                        style={styles.inputs}
                        onChangeText={text => setForm({ ...form, title: text })}
                        iconContent={
                          <Icon
                            size={16}
                            color='#ADB5BD'
                            name='profile-circle'
                            family='NowExtra'
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        placeholder='Note'
                        style={styles.inputs}
                        onChangeText={text => setForm({ ...form, note: text })}
                        iconContent={
                          <Icon
                            size={16}
                            color='#ADB5BD'
                            name='caps-small2x'
                            family='NowExtra'
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <GooglePlacesInput
                        handleDestination={handleDestination}
                      />
                    </Block>
                    <View
                      width={width * 0.8}
                      style={{ marginBottom: 5 }}
                    ></View>
                    <Block width={width * 0.8}>
                      <Text>Start date</Text>
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={startDate}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        style={styles.dateButton}
                        onChange={setStart}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Text>End date</Text>
                      <DateTimePicker
                        onChange={setEnd}
                        testID='dateTimePicker'
                        value={endDate}
                        mode='date'
                        display='default'
                        style={styles.dateButton}
                      />
                      <ImagePickerExample imageHandle={handleImage} />
                    </Block>
                  </Block>
                  <Block center>
                    <ButtonSubmit
                      color='INFO'
                      round
                      style={styles.createButton}
                      onPress={() => handleSubmit(form)}
                    >
                      <Text size={14} color={nowTheme.COLORS.WHITE}>
                        Create a new itinerary
                      </Text>
                    </ButtonSubmit>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </DismissKeyboard>
      <Map fullCoordinates={fullCoordinates} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    // marginTop: -70,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  dateButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 0,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3.5,
    height: nowTheme.SIZES.BASE * 3.5,
    borderRadius: nowTheme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
