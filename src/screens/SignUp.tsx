import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { COLORS, FONTS, SHADOWS } from "../constants/theme";
import { Formik } from "formik";
import CheckBox from "expo-checkbox";
import * as yup from "yup";
import { useAppContext } from "../lib/Context";
const SignUp = ({ navigation }: any) => {
  const auth = useAppContext();
  const [checked, setChecked] = useState(false);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.offWhite}
        barStyle={"dark-content"}
      ></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={[
              styles.text,
              { fontSize: 24, color: COLORS.dark, textAlign: "center" },
            ]}
          >
            Welcome to {""}
            <Text style={{ color: COLORS.primary }}>DocTrue</Text>
          </Text>
          <Text style={styles.subText}>Let us get to know you better!</Text>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            if (checked) {
              //   auth?.signup(values.email, values.password);
              navigation.navigate("Register", {
                email: values.email,
                password: values.password,
              });
            } else {
              Alert.alert("Please check T&Cs");
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                  style={styles.input}
                  keyboardType={"email-address"}
                  placeholderTextColor={COLORS.gray}
                />
                {errors.email && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  style={styles.input}
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                />
                <Text
                  style={{
                    marginLeft: 12,
                    color: "#CDCFD0",
                    alignSelf: errors.password ? "auto" : "flex-start",
                  }}
                >
                  {errors.password ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {errors.password}
                    </Text>
                  ) : (
                    <Text style={styles.text}>*minimum 6 characters</Text>
                  )}
                </Text>
                <TextInput
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  style={styles.input}
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry
                />
                {errors.confirmPassword && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <View
                style={{
                  margin: 12,
                  padding: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  disabled={false}
                  value={checked}
                  color={checked ? COLORS.primary : "black"}
                  //   tintColors={{ true: COLORS.primary, false: "black" }}
                  onValueChange={(newValue) => setChecked(newValue)}
                />
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={[styles.text, { color: COLORS.dark }]}>
                    By clicking here I agree to DocTrue's
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Privacy Policy");
                    }}
                  >
                    <Text style={[styles.text, { color: COLORS.primary }]}>
                      Terms Of Service{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.text, { color: COLORS.dark }]}>
                    and{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Privacy Policy");
                    }}
                  >
                    <Text style={[styles.text, { color: COLORS.primary }]}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
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
                  CONTINUE
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text
          style={{
            marginTop: "15%",
            textAlign: "center",
            fontWeight: "bold",
            color: COLORS.dark,
          }}
        >
          OR
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
            //   auth?.onGoogleButtonPress();
            }}
          >
            <Image
              source={require("../assets/Google.png")}
              style={styles.logo}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Text
            style={[
              styles.text,
              {
                color: COLORS.dark,
                marginRight: 0,
              },
            ]}
          >
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[styles.text, { color: COLORS.primary }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
  subText: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
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
  },
  logo: {
    width: 35,
    height: 35,
  },
});
