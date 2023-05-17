import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";
interface prop {
  name: string;
  pos: string | number;
  gender: string;
  age: string | number;
  OnPressed: () => void;
}
const LiveQueuePersonCard = (props: prop) => {
  function calculate_age(dob: Date) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970)
      ? Math.abs(age_dt.getUTCFullYear() - 1970)
      : "";
  }
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={[
            styles.text,
            { fontSize: 25, color: "rgba(36, 164, 222, 1)" },
          ]}
        >
          {props.pos}
        </Text>
      </View>
      <View style={{ flex: 0.25, justifyContent: "center" }}>
        <Text style={[styles.text, { fontSize: 16, color: "black" }]}>
          {props.name}
        </Text>
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <Text style={[styles.text, { fontSize: 16, color: "black" }]}>
          {props.gender}
        </Text>
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <Text style={[styles.text, { fontSize: 16, color: "black" }]}>
          {calculate_age(new Date(props.age))}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={props.OnPressed}>
        <Text
          style={[
            styles.text,
            { fontSize: 14, color: "white", textAlign: "center" },
          ]}
        >
          End Booking
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveQueuePersonCard;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "95%",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "center",
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
  button: {
    flex: 0.25,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    margin: 7,
    marginLeft: 0,
    borderRadius: 10,
    alignItems: "center",
  },
});
