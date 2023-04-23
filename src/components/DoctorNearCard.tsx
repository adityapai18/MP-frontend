import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { FONTS } from "../constants/theme";
interface DoctorNearCard {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  imageURL: string;
  fname: string;
  lname: string;
  speciality: string;
}
const DoctorNearCard = (props: DoctorNearCard) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image
        source={{
          uri: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000",
        }}
        style={{
          alignSelf: "center",
          height: 160,
          width: 160,
          resizeMode: "contain",
          borderRadius: 10,
        }}
      ></Image>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.text, { fontSize: 16 }]}>
          Dr. {props.fname} {props.lname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorNearCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    marginLeft: 15,
  },
  text: {
    fontFamily: FONTS.regular,
    color: "black",
  },
});
