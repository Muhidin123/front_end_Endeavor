import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";

function SearchBarComponent(props) {
  let directionsTo = props.location.split(" ").map(elem => {
    return elem.replace(",", "");
  });
  directionsTo = directionsTo.join("+");

  const [input, setInput] = useState("");

  let userInputToUrl = input.split(" ").map(elem => {
    return elem.replace(",", "");
  });
  userInputToUrl = userInputToUrl.join("+");

  const handleSearch = () => {
    WebBrowser.openBrowserAsync(
      `https://www.google.com/maps/search/?api=1&query=${userInputToUrl}+${directionsTo}`
    );
    setInput("");
  };
  return (
    <SearchBar
      placeholder="e.g pizza, beer, Lou Malnati's"
      onChangeText={setInput}
      value={input}
      lightTheme={true}
      round={true}
      containerStyle={{ borderRadius: 21.5, height: 50 }}
      inputContainerStyle={{ backgroundColor: "white" }}
      platform='ios'
      inputStyle={{ backgroundColor: "white" }}
      onSubmitEditing={handleSearch}
    />
  );
}

export default SearchBarComponent;
