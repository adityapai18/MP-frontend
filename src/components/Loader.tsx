import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

const Loader = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
        Booking Your Appointment
      </Text>
      <ActivityIndicator size={24} color={COLORS.primary} animating />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    position: "absolute",
    backgroundColor: "#090323",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: FONTS.regular,
  },
});
