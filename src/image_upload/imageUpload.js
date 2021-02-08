import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.imageHandle(result);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "left", justifyContent: "left" , top: 10}}>
      <Button title='Add an image' onPress={pickImage} />
    </View>
  );
}

// const imageWithoutBase64 =  {
//     "cancelled": false,
//     "height": 2848,
//     "type": "image",
//     "uri": "file:///Users/muhidinhukic/Library/Developer/CoreSimulator/Devices/B0C03301-B218-4477-A7B5-70436F1C0900/data/Containers/Data/Application/B0975BB7-71EB-4D18-8F50-314473EE8F19/Library/Caches/ExponentExperienceData/%2540anonymous%252Ffront_end_Trip-IT-daaaddff-bc63-421e-a9a7-11f8d2f83104/ImagePicker/658B1A3A-689A-4867-8D3B-E33A9F047ACD.jpg",
//     "width": 4288,
//   }
