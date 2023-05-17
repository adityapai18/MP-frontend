import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, SHADOWS } from "../constants/theme";
import { Formik } from "formik";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppContext } from "../lib/Context";
import { createClinic, createConsult } from "../lib/Api";
import { StackActions, useNavigation } from "@react-navigation/native";

const Step2 = ({ navigation, route }: any) => {
  const DocData = route.params;
  const context = useAppContext();
  const loginValidationSchema = yup.object().shape({});
  const [Open, setOpen] = useState(false);
  const [FromTo, setFromTo] = useState("");
  const [ClinicData, setClinicData] = useState<{
    data: GooglePlaceData;
    details: GooglePlaceDetail | null;
  }>();
  const nav = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [CurTime, setCurTime] = useState(new Date());
  function formatTime(timeString: string) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return hour + ":" + minute;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.text,
            { marginTop: 24, fontSize: 24, textAlign: "center" },
          ]}
        >
          Add Clinic
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            hospitalName: "",
            startTime: "",
            endTime: "",
            clinicAddr: "",
            lat: Number(),
            long: Number(),
          }}
          onSubmit={async (values) => {
            setLoading(true);
            const c_data = {
              name: values.hospitalName,
              address: ClinicData?.data.description,
              lat: ClinicData?.details?.geometry.location.lat,
              long: ClinicData?.details?.geometry.location.lng,
            };
            const consult_data = {
              start_time: values.startTime,
              end_time: values.endTime,
            };
            console.log({ ...DocData, c_data, consult_data });
            // context?.signup({ ...DocData, c_data, consult_data });
            //@ts-ignore
            const clinicRes = await createClinic(c_data);
            if (clinicRes) {
              const consultRes = await createConsult(
                consult_data,
                //@ts-ignore
                context?.Doctor.uuid,
                clinicRes
              );
              if (consultRes) {
                nav.dispatch(StackActions.popToTop());
              }
            }
            setLoading(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View
                style={{
                  marginTop: 25,
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}
              >
                <Text
                  style={[styles.text, { color: COLORS.dark, fontSize: 16 }]}
                >
                  Clinic or hospital name
                </Text>
                <TextInput
                  onChangeText={handleChange("hospitalName")}
                  onBlur={handleBlur("hospitalName")}
                  value={values.hospitalName}
                  placeholder="Enter your clinic or hospital name"
                  style={styles.input}
                  keyboardType={"default"}
                  placeholderTextColor={COLORS.gray}
                />
                {errors.hospitalName && (
                  <Text
                    style={{ fontSize: 10, color: "red", textAlign: "center" }}
                  >
                    {errors.hospitalName}
                  </Text>
                )}
                <Text
                  style={[styles.text, { color: COLORS.dark, fontSize: 16 }]}
                >
                  Clinic Location
                </Text>
                <GooglePlacesAutocomplete
                  GooglePlacesDetailsQuery={{ fields: "geometry" }}
                  placeholder="Search for clinic location"
                  fetchDetails={true}
                  isRowScrollable={true}
                  textInputProps={{
                    placeholderTextColor: COLORS.gray,
                    // onChangeText: text => handleChange('clinicLoc')(text),
                  }}
                  minLength={3}
                  // suppressDefaultStyles
                  renderRightButton={() => (
                    <MaterialIcons
                      name="my-location"
                      size={24}
                      style={{ marginRight: 10 }}
                      color="#CCCCCC"
                    />
                  )}
                  enablePoweredByContainer={false}
                  styles={{
                    container: { marginBottom: 15 },
                    textInputContainer: [
                      styles.input,
                      {
                        padding: 0,
                        margin: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ],
                    textInput: { color: COLORS.dark },
                    predefinedPlacesDescription: {
                      color: "#1faadb",
                    },
                    listView: { borderRadius: 10, marginTop: 10 },
                  }}
                  renderRow={(rowData) => {
                    const title = rowData.structured_formatting.main_text;
                    const address =
                      rowData.structured_formatting.secondary_text;
                    return (
                      <View
                        style={{
                          height: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Entypo
                          name="location-pin"
                          size={20}
                          color="grey"
                          style={{ marginRight: 5 }}
                        />
                        <View>
                          <Text style={styles.text}>{title}</Text>
                          <Text
                            style={[
                              styles.text,
                              { color: COLORS.gray, fontSize: 10 },
                            ]}
                          >
                            {address}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setClinicData({ data, details });
                    //@ts-ignore
                    // handleChange('lat')(details?.geometry.location.lat)
                    //@ts-ignore
                    // handleChange('long')(details?.geometry.location.long)
                    // handleChange("clinicAddr")(
                    //   data.description
                    // );
                  }}
                  query={{
                    key: "AIzaSyAwuhkKze-DtmUFqF6i-6mR_jpEmGrmCtA",
                    language: "en",
                  }}
                />
                {errors.clinicAddr && (
                  <Text
                    style={{ fontSize: 10, color: "red", textAlign: "center" }}
                  >
                    {errors.clinicAddr}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[styles.text, { color: COLORS.dark, fontSize: 16 }]}
                  >
                    Clinic timings
                  </Text>
                </View>
                <View
                  style={[styles.input, { flexDirection: "row", height: 60 }]}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      setFromTo("from");
                      setOpen(true);
                    }}
                  >
                    <Text style={[styles.text, { fontSize: 12 }]}>From</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 16, color: "rgba(151, 156, 158, 1)" },
                        ]}
                      >
                        {values.startTime ? values.startTime : ""}
                      </Text>
                      <AntDesign
                        name="down"
                        size={16}
                        color="rgba(19, 69, 99, 1)"
                        style={{ marginLeft: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      borderLeftWidth: 1,
                      borderLeftColor: "rgba(204, 204, 204, 1)",
                      paddingLeft: 10,
                    }}
                    onPress={() => {
                      setFromTo("to");
                      setOpen(true);
                    }}
                  >
                    <Text style={[styles.text, { fontSize: 12 }]}>To</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={[
                          styles.text,
                          { fontSize: 16, color: "rgba(151, 156, 158, 1)" },
                        ]}
                      >
                        {values.endTime ? values.endTime : ""}
                      </Text>
                      <AntDesign
                        name="down"
                        size={16}
                        color="rgba(19, 69, 99, 1)"
                        style={{ marginLeft: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                  {Open && (
                    <DateTimePicker
                      mode="time"
                      onChange={(time) => {
                        setCurTime(new Date(time.nativeEvent.timestamp));
                        if (FromTo == "from") {
                          handleChange("startTime")(
                            CurTime.toTimeString().split(" ")[0]
                          );
                          setFromTo("");
                          setOpen(false);
                        } else if (FromTo == "to") {
                          handleChange("endTime")(
                            CurTime.toTimeString().split(" ")[0]
                          );
                          setFromTo("");
                          setOpen(false);
                        }
                      }}
                      value={CurTime}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "700",
                      fontSize: 18,
                      color: "white",
                      marginTop: 0,
                    },
                  ]}
                >
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    backgroundColor: COLORS.offWhite,
    flex: 1,
  },
  text: {
    fontFamily: FONTS.regular,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 56,
    // boxShadow: SHADOWS.dark,
    margin: 12,
    padding: 8,
    color: COLORS.lightgray,
    width: "100%",
    alignSelf: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
});
