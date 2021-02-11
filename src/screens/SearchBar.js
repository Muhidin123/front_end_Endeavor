import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

function SearchBarComponent() {
  const [input, setInput] = useState("");
  return (
    <SearchBar
      placeholder='Type Here...'
      onChangeText={setInput}
      value={input}
    />
  );
}

export default SearchBarComponent;
