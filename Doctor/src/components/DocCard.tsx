import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
// import Switch from './Switch';
import { COLORS, FONTS } from "../constants/theme";
import { useAppContext } from "../lib/Context";
import { useNavigation } from "@react-navigation/native";

const DocCard = (props: {
  totalBooking: number | undefined;
  timings: string[] | undefined;
  inPatients?: number;
}) => {
  const auth = useAppContext();
  const [SwitchBool, setSwitchBool] = useState(false);
  const nav = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              nav.navigate("Profile");
            }}
          >
            <Image
              source={{ uri: auth?.Doctor.photo }}
              resizeMode="contain"
              style={{
                marginHorizontal: 10,
                height: 50,
                width: 50,
                borderRadius: 50,
              }}
            ></Image>
          </TouchableOpacity>
          <View style={{ alignSelf: "center" }}>
            <Text style={[styles.text, { color: "rgba(124, 121, 121, 1)" }]}>
              Welcome
            </Text>
            <Text style={[styles.text, { fontSize: 16 }]}>
              Dr. {auth?.Doctor.name}
            </Text>
          </View>
        </View>
        {/* <Switch setSwitch={setSwitchBool} Switch={SwitchBool} /> */}
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View
          style={{
            flex: 0.25,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderRightColor: "rgba(204, 204, 204, 1)",
            borderRightWidth: 1,
          }}
        >
          <Text style={[styles.text, { fontSize: 35, color: COLORS.primary }]}>
            {props.totalBooking}
          </Text>
          <Text style={[styles.text, { textAlign: "center", fontSize: 10 }]}>
            Todays Bookings
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "space-evenly",
            borderRightColor: "rgba(204, 204, 204, 1)",
            borderRightWidth: 1,
          }}
        >
          <Text style={[styles.text, { fontSize: 20, color: COLORS.primary }]}>
            {/* @ts-ignore */}
            {props.timings[0]}
            {"-"}
            {/* @ts-ignore */}
            {props.timings[1]}
          </Text>
          <Text style={[styles.text, { textAlign: "center", fontSize: 10 }]}>
            Todays Bookings
          </Text>
        </View>
        <View
          style={{
            flex: 0.25,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={[styles.text, { fontSize: 35, color: COLORS.primary }]}>
            {props.inPatients ? props.inPatients : 0}
          </Text>
          <Text style={[styles.text, { textAlign: "center", fontSize: 10 }]}>
            In Clinic Patients
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DocCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
