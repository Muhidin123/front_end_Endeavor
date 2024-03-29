import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fetchCall from "../../Fetch";
import { Button, Icon, Input } from "../individual_components";
import { nowTheme } from "../constants";
const { width, height } = Dimensions.get("screen");
const URL = "http://localhost:3000/api/v1/users";
const fetchReq = new fetchCall();

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Register({ navigation }) {
  const handleSubmit = e => {
    let body = { user: e };
    fetchReq
      .generalFetch(URL, fetchReq.makeOptions("POST", body))
      .then(data => {
        if (!data.user.error) {
          //RESET NAVIGATION SO USER CAN NOT GO BACK TO LOGIN OR SIGN UP
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
        console.log(data.error);
      });
  };
  const initialState = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    bio: "",
  };
  const [form, setForm] = useState(initialState);
  return (
    <KeyboardAwareScrollView>
      <DismissKeyboard>
        <Block flex middle>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space='evenly'>
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                      color='#333'
                      size={24}
                    >
                      NOPE SCROLL DOWN TO REGISTER
                    </Text>
                  </Block>

                  <Block
                    flex={0.5}
                    row
                    middle
                    space='between'
                    style={{ marginBottom: 18 }}
                  >
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon='facebook'
                      iconFamily='Font-Awesome'
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>
                <Block flex={0.1} middle>
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                    muted
                    size={16}
                  >
                    or be classical
                  </Text>
                </Block>
                <Block flex={1} middle space='between'>
                  <Block center flex={0.9}>
                    <Block flex space='between'>
                      <Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            placeholder='First Name'
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
                            placeholder='Last Name'
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
                          <Input
                            onChangeText={text =>
                              setForm({ ...form, password: text })
                            }
                            placeholder='Password'
                            style={styles.inputs}
                            secureTextEntry={true}
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
                          <Input
                            onChangeText={text =>
                              setForm({ ...form, username: text })
                            }
                            placeholder='Username'
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
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            textContentType={"emailAddress"}
                            onChangeText={text =>
                              setForm({ ...form, email: text })
                            }
                            placeholder='Email'
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color='#ADB5BD'
                                name='email-852x'
                                family='NowExtra'
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                          <Input
                            multiline={true}
                            textAlignVertical='top'
                            onChangeText={text =>
                              setForm({ ...form, bio: text })
                            }
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
                        </Block>
                      </Block>
                      <Block center>
                        <Button
                          color='INFO'
                          round
                          style={styles.createButton}
                          onPress={() => handleSubmit(form)}
                        >
                          <Text size={14} color={nowTheme.COLORS.WHITE}>
                            Get Started
                          </Text>
                        </Button>
                      </Block>
                    </Block>
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
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: -70,
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
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
