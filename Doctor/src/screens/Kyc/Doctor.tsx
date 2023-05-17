import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SHADOWS } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "../../lib/Firebase";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";

const Doctor = ({ navigation, route }: any) => {
  const [ImageUp, setImageUp] =
    useState<ImagePicker.ImagePickerSuccessResult>();
  const [MedicCert, setMedicCert] = useState<DocumentPicker.DocumentResult>();
  const [Loading, setLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
  });
  const uploadUriFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const fileUrl = uri.split("/");
    const fileName = fileUrl[fileUrl.length - 1];
    const imageBuff = await response.blob();
    // console.log(imageBuff)
    var imageRef = ref(storage, "files/" + fileName);
    const upload = await uploadBytes(imageRef, imageBuff);
    const url = await getDownloadURL(imageRef);
    return url;
  };
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type == "success") setMedicCert(result);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result.assets);

    if (!result.canceled) {
      setImageUp(result);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.text,
          { marginTop: 10, fontSize: 24, textAlign: "center" },
        ]}
      >
        Personal Information
      </Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
        }}
        onSubmit={async (values) => {
          // console.log(values);
          // navigation.navigate("Clinic", { userData: values });
          setLoading(true);
          const img = await uploadUriFirebase(
            ImageUp?.assets[0].uri ? ImageUp?.assets[0].uri : ""
          );
          const doc = await uploadUriFirebase(
            MedicCert?.type == "success" ? MedicCert.uri : ""
          );
          if (img && doc) {
            setLoading(false);
            navigation.navigate("Clinic", {
              docData: {
                ...values,
                photo: img,
                medical_certificate: doc,
                ...route.params,
              },
            });
          } else {
            alert("Upload Error");
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <View
              style={{
                marginTop: 25,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}
            >
              <TextInput
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="First Name"
                style={styles.input}
                keyboardType={"default"}
                placeholderTextColor={COLORS.gray}
              />
              {errors.firstName && (
                <Text
                  style={{ fontSize: 10, color: "red", textAlign: "center" }}
                >
                  {errors.firstName}
                </Text>
              )}
              <TextInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Last Name"
                style={styles.input}
                placeholderTextColor={COLORS.gray}
              />
              {errors.lastName && (
                <Text
                  style={{ fontSize: 10, color: "red", textAlign: "center" }}
                >
                  {errors.lastName}
                </Text>
              )}
              <View
                style={[
                  styles.input,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text style={{ color: COLORS.gray, marginRight: 5, flex: 0.1 }}>
                  +91
                </Text>
                <TextInput
                  style={{ color: COLORS.lightgray, flex: 0.8 }}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  placeholder="Phone Number"
                  placeholderTextColor={COLORS.gray}
                  keyboardType={"phone-pad"}
                />
                {/* <TouchableOpacity style={{flex: 0.2}}>
                    {!errors.phoneNumber && values.phoneNumber && (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={
                          () => {
                            auth?.verifyPhoneNumber('+91' + values.phoneNumber);
                          }
                        }>
                        <Text style={{color: COLORS.primary}}>GET OTP</Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity> */}
              </View>
              {errors.phoneNumber && (
                <Text
                  style={{ fontSize: 10, color: "red", textAlign: "center" }}
                >
                  {errors.phoneNumber}
                </Text>
              )}
              {/* {!errors.phoneNumber && values.phoneNumber && (
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
                      <Text style={{fontSize: 10, color: 'red',textAlign:'center'}}>
                        {errors.otp}
                      </Text>
                    )}
                  </>
                )} */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    marginTop: 32,
                  },
                ]}
                onPress={() => pickDocument()}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "700",
                      fontSize: 18,
                      color: COLORS.primary,
                    },
                  ]}
                >
                  Upload Medical Certificate
                </Text>
              </TouchableOpacity>
              {MedicCert && (
                <Text> {MedicCert.type == "success" && MedicCert.name}</Text>
              )}
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    marginTop: 32,
                  },
                ]}
                onPress={() => pickImage()}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "700",
                      fontSize: 18,
                      color: COLORS.primary,
                    },
                  ]}
                >
                  Upload Your Image
                </Text>
              </TouchableOpacity>
              {ImageUp && (
                <Image
                  source={{ uri: ImageUp.assets[0].uri }}
                  style={{
                    height: 96,
                    width: 96,
                    alignSelf: "center",
                    resizeMode: "contain",
                  }}
                />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                Loading
                  ? {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      opacity:0.7
                    }
                  : {
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
              ]}
              disabled={Loading}
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
              <ActivityIndicator animating={Loading} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Doctor;

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
    marginTop: 12,
    padding: 8,
    color: COLORS.lightgray,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    padding: 12,
  },
});
