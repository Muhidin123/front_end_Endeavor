import React, { Component } from "react";
import fetchCall from "../../Fetch";
import styles from "./style";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
const URL = "http://localhost:3000/api/v1/login";
const URL_ON_REFRESH = "http://localhost:3000/api/v1/profile";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
let fetchReq = new fetchCall();

const appId = "460873211757502";

const storeCurrentUserData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("currentUser", jsonValue);
  } catch (e) {
    console.warn(e, "WARNING");
  }
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "muhidin",
      password: "muhidin",
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior='padding'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Endeavor</Text>
              <TextInput
                placeholder='Username'
                placeholderColor='#c4c3cb'
                style={styles.loginFormTextInput}
                onChangeText={text => this.setState({ username: text })}
                name='username'
              />
              <TextInput
                placeholder='Password'
                placeholderColor='#c4c3cb'
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onLoginPress()}
                title='Login'
              />
              <Button
                buttonStyle={styles.fbLoginButton}
                onPress={() => this.onFbLoginPress()}
                title='Login with Facebook'
                color='#3897f1'
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push("SignUp");
                  console.log("pressed");
                }}
              >
                <Text style={styles.singUp}>Sign up ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  onLoginPress() {
    fetchReq
      .generalFetch(URL, fetchReq.makeOptions("POST", this.state))
      .then(data => {
        if (!data.user.error) {
          console.log(data);
          storeCurrentUserData(data);
          //RESET NAVIGATION SO USER CAN NOT GO BACK TO LOGIN OR SIGN UP
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
        console.log("Error");
      });
  }

  async onFbLoginPress() {
    try {
      await Facebook.initializeAsync({
        appId: appId,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}
