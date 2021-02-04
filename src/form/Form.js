import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import GoogleSearch from "../search/search"
import { Block, Text } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fetchCall from "../../Fetch";
import { Button as ButtonSubmit, Icon, Input } from "../individual_components";
import { nowTheme } from "../constants/index";
import Map from "../map/Map";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const date = new Date();

export default function Form({ navigation }) {
  const handleSubmit = e => {
    console.log(e);
  };

  const initialState = {
    title: "",
    start: "",
    end: "",
    destination_name: "",
    latitude: "",
    longitude: "",
  };

  const [form, setForm] = useState(initialState);
  return (
    <KeyboardAwareScrollView>
      <DismissKeyboard>
        <Block flex middle>
          <Block flex middle>
            <Block flex={0.4} middle style={styles.socialConnect}>
              <Block flex={0.5} middle>
                {/* ADD TEXT TO HEADER FORM HERE */}
              </Block>

              <Block
                flex={0.5}
                row
                middle
                space='between'
                style={{ marginBottom: 18 }}
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
                        onChangeText={text =>
                          setForm({ ...form, first_name: text })
                        }
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
                        onChangeText={text =>
                          setForm({ ...form, last_name: text })
                        }
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
                      {/* <Input
                        onChangeText={text =>
                          setForm({ ...form, password: text })
                        }
                        placeholder='Destination name'
                        style={styles.inputs}
                        iconContent={
                          <Icon
                            size={16}
                            color='#ADB5BD'
                            name='caps-small2x'
                            family='NowExtra'
                            style={styles.inputIcons}
                          />
                        }
                      /> */}
                      <GoogleSearch />
                    </Block>
                    <Block
                      width={width * 0.8}
                      style={{ marginBottom: 5 }}
                    ></Block>
                    <Block width={width * 0.8}>
                      <Text>Start date</Text>
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        style={styles.dateButton}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Text>End date</Text>
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        style={styles.dateButton}
                      />
                    </Block>
                    {/* <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        multiline={true}
                        textAlignVertical='top'
                        onChangeText={text => setForm({ ...form, bio: text })}
                        placeholder='Bio'
                        style={styles.inputs}
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
                    </Block> */}
                  </Block>
                  <Block center>
                    <ButtonSubmit
                      color='INFO'
                      round
                      style={styles.createButton}
                      onPress={() => handleSubmit(form)}
                    >
                      <Text size={14} color={nowTheme.COLORS.WHITE}>
                        Create a new Itin
                      </Text>
                    </ButtonSubmit>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </DismissKeyboard>
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
