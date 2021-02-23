const trip = {
  date: "2021-02-18T02:50:01.390Z",
  description: "Calling all soccer fans",
  destination_name: "Camp Nou, Carrer d'Arístides Maillol, Barcelona, Spain",
  id: 66,
  image:
    "http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBmZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fd65c89487e9c299611d609c70d050733e7f7674/A8130FA3-D00B-46F6-92B0-B41BF5A4D90B.jpg",
  latitude: 41.38080214999999,
  latitude_delta: 0.007850999999988062,
  longitude: 2.1214476999999996,
  longitude_delta: 0.005488400000000837,
  note: "Must visit especially if you are soccer fan, catch a game if possible",
  trip_id: 83,
  user: {
    id: 5,
    username: "muhidin",
    bio: "BIO",
    email: "Muhidin@muhidin.com",
    first_name: "Muhidin",
    last_name: "Hukic",
  },
};
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import { ScrollView, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Favorites() {
  return (
    <ScrollView>
      <Card>
        <CardImage source={{ uri: trip.image }} title={trip.description} />
        <CardTitle subtitle='http://localhost:3000/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBjZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--04b5276bc339485224636c28c39ef3af0f58b227/C29DA1A9-3251-4D03-838C-B34AC45EEF9C.jpg' />
        <CardContent
          avatarSource={{ uri: trip.image }}
          text={`${trip.user.first_name} ${trip.user.last_name}`}
        />
        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={() => {}}
            title='Explore'
            color='#FEB557'
            style={{
              flex: 1,
              alignItems: "flex-start",
            }}
          />
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity>
              <MaterialCommunityIcons name='map' size={24} />
            </TouchableOpacity>
          </View>
        </CardAction>
        <CardAction>
          <CardButton
            onPress={() => {}}
            title={trip.destination_name}
            color='#bdbdbd'
            style={{ flex: 1, alignItems: "flex-end" }}
          />
        </CardAction>
      </Card>
    </ScrollView>
  );
}
