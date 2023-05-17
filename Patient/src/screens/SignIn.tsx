import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, SHADOWS } from "../constants/theme";
import { Formik } from "formik";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppContext } from "../lib/Context";
const SignIn = ({ navigation }: any) => {
  const auth = useAppContext();
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={[
              styles.text,
              { fontSize: 24, color: COLORS.dark, textAlign: "center" },
            ]}
          >
            Welcome back
          </Text>
          <Text style={styles.subText}>Let us get started!</Text>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            auth?.signin(values.email, values.password);
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
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={{ marginVertical: 10 }}
                onPress={() => {
                  navigation.navigate("ForgotPass");
                }}
              >
                <Text style={{ color: COLORS.primary, alignSelf: "flex-end" }}>
                  {" "}
                  Forgot Password?{" "}
                </Text>
              </TouchableOpacity>
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
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
            Dont have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text style={[styles.text, { color: COLORS.primary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

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
    marginTop: 10,
  },
  logo: {
    width: 35,
    height: 35,
  },
});
