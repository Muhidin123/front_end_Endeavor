import React, { Component } from "react";
import { Button, Linking, View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";

export default class DeepLinking extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title='Open URL with ReactNative.Linking'
          onPress={this._handleOpenWithLinking}
          style={styles.button}
        />
        <Button
          title='Open URL with Expo.WebBrowser'
          onPress={this._handleOpenWithWebBrowser}
          style={styles.button}
        />
      </View>
    );
  }

  _handleOpenWithLinking = () => {
    Linking.openURL("http://maps.apple.com");
  };

  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(
      "https://www.google.com/maps/search/?api=1&query=pizza+seattle+wa"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  button: {
    marginVertical: 10,
  },
});
