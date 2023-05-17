import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FONTS, COLORS } from "../constants/theme";
import { Clinic } from "../lib/interfaces";
import axios from "axios";
import baseUrl from "../lib/baseUrl";
import { RadioButton } from "react-native-paper";
const ClinicCard = (props: {
  id: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  Selected: string;
}) => {
  const [ClinicDetails, setClinicDetails] = useState<Clinic>();
  useEffect(() => {
    axios
      .get(baseUrl + "clinic/" + props.id)
      .then((data) => setClinicDetails(data.data));
  }, []);
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => props.setSelected(props.id)}
    >
      <RadioButton
        value={props.id}
        status={props.id == props.Selected ? "checked" : "unchecked"}
      />
      <Text style={styles.text}>{ClinicDetails?.name}</Text>
    </TouchableOpacity>
  );
};

export default ClinicCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
});
