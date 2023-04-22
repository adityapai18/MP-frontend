import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SHADOWS } from "../constants/theme";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useAppContext } from "../lib/Context";
import { registerInDb } from "../lib/Api";
const Register = ({ navigation, route }: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const loginValidationSchema = yup.object().shape({
    fname: yup.string().required("First Name is Required"),
    lname: yup.string().required("Last Name is Required"),
    phone: yup
      .string()
      .min(10, "Please check phone number")
      .max(10, "Please check phone number")
      .required(),
    // otp: yup.string().required('OTP is required'),
  });
  const auth = useAppContext();
  const routeData = route.params;
  console.log(routeData);
  const [Gender, setGender] = useState("male");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={COLORS.offWhite}
      ></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={[
            styles.text,
            { color: "black", textAlign: "center", fontSize: 24 },
          ]}
        >
          Register
        </Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            fname: "",
            lname: "",
            phone: "",
            // otp: '',
          }}
          onSubmit={async (values) => {
            console.log(values);
            // auth?.regForm(values.otp,values.lname,values.fname,Gender,date);
            const res = await registerInDb({
              name: values.fname + " " + values.lname,
              phone: values.phone,
              gender: Gender,
              dob: date.toLocaleDateString(),
              email: routeData.email,
              password: routeData.password,
            });
            if (res) {
              navigation.navigate("SignIn");
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <View
                style={{
                  marginTop: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  onChangeText={handleChange("fname")}
                  onBlur={handleBlur("fname")}
                  value={values.fname}
                  placeholder="First Name"
                  style={styles.input}
                  placeholderTextColor={COLORS.gray}
                />
                {errors.fname && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.fname}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange("lname")}
                  onBlur={handleBlur("lname")}
                  value={values.lname}
                  placeholder="Last Name"
                  style={styles.input}
                  placeholderTextColor={COLORS.gray}
                />
                {errors.lname && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.lname}
                  </Text>
                )}
                <View
                  style={[
                    styles.input,
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <Text
                    style={{ color: COLORS.gray, marginRight: 5, flex: 0.1 }}
                  >
                    +91
                  </Text>
                  <TextInput
                    style={{ color: COLORS.lightgray, flex: 0.7 }}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    placeholder="Phone Number"
                    placeholderTextColor={COLORS.gray}
                    keyboardType={"phone-pad"}
                  />
                  {/* <TouchableOpacity style={{flex: 0.2}}>
                      {!errors.phone && values.phone && (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={()=>auth?.verifyPhoneNumber('+91'+values.phone)}
                          >
                          <Text style={{color: COLORS.primary}}>GET OTP</Text>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity> */}
                </View>
                {errors.phone && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.phone}
                  </Text>
                )}
                {/* {!errors.phone && values.phone && (
                    <>
                      <TextInput
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        value={values.otp}
                        placeholder="Enter OTP"
                        style={styles.input}
                        keyboardType={'phone-pad'}
                        placeholderTextColor={COLORS.gray}
                      />
                      {errors.otp && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.otp}
                        </Text>
                      )}
                    </>
                  )} */}
              </View>
              <View style={{ padding: 8 }}>
                <Text
                  style={[styles.text, { color: COLORS.dark, fontSize: 16 }]}
                >
                  Gender
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                    onPress={() => setGender("male")}
                  >
                    <SimpleLineIcons
                      name="symbol-male"
                      size={30}
                      color={
                        Gender === "male" ? "rgba(36, 164, 222, 1)" : "grey"
                      }
                    />
                    <Text
                      style={{
                        color:
                          Gender === "male" ? "rgba(36, 164, 222, 1)" : "grey",
                        marginTop: 5,
                      }}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                    onPress={() => setGender("female")}
                  >
                    <SimpleLineIcons
                      name="symbol-female"
                      size={30}
                      color={
                        Gender === "female" ? "rgba(36, 164, 222, 1)" : "grey"
                      }
                    />
                    <Text
                      style={{
                        color:
                          Gender === "female"
                            ? "rgba(36, 164, 222, 1)"
                            : "grey",
                        marginTop: 5,
                      }}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text
                  style={[
                    styles.text,
                    { color: COLORS.dark, fontSize: 16, padding: 8 },
                  ]}
                >
                  Date of Birth
                </Text>
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                  ]}
                >
                  <TextInput
                    value={date.toLocaleDateString()}
                    placeholder="Your DOB"
                    placeholderTextColor={COLORS.gray}
                  />
                  {open && (
                    <DateTimePicker
                      textColor={"black"}
                      mode="date"
                      value={new Date()}
                      onChange={(change, val) => {
                        if (change.type === "set") {
                          setDate(val ? val : new Date());
                        }
                        setOpen(false);
                      }}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(true);
                    }}
                  >
                    <AntDesign name="calendar" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "700",
                      fontSize: 18,
                      color: "white",
                    },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 56,
    // boxShadow: SHADOWS.dark,
    margin: 12,
    padding: 8,
    color: COLORS.lightgray,
    width: "95%",
  },
  button: {
    backgroundColor: "#0A94FF",
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  blankButton: {
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 20,
  },
});
