const React = require("react-native");
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

const { StyleSheet } = React;

export default {
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 21.5,
  },
  loginButton: {
    backgroundColor: "#2CA8FF",
    borderRadius: 21.5,
    width: width * 0.5,
    marginLeft: width * 0.25,
    marginRight: width * 0.25,
    height: 45,
    marginTop: 20,
  },
  fbLoginButton: {
    borderRadius: 21.5,
    width: width * 0.5,
    marginLeft: width * 0.25,
    marginRight: width * 0.25,
    height: 45,
    marginTop: 10,
    backgroundColor: "#2CA8FF",
  },
  singUp: {
    fontSize: 18,
    marginTop: 70,
    marginBottom: 30,
    textAlign: "center",
  },
};
