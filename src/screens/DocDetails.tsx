import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../constants/theme";
import { Divider, RadioButton } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import ClinicStatus from "../components/ClinicStatus";
import DoctorEducation from "../components/DoctorEducation";
import DoctorAboutMe from "../components/DoctorAboutMe";
import { calcDistance, createBooking } from "../lib/Api";
import { Clinic, DoctorExtended } from "../lib/interfaces";
import * as Location from "expo-location";
import { useAppContext } from "../lib/Context";
const DocDetails = ({ navigation, route }: any) => {
  const docNearData: DoctorExtended = route.params.data;
  const context = useAppContext();
  // console.log(docNearData);
  // const locationData: Geolocation.GeoCoordinates = route.params.currPosition;
  // console.log(docNearData.mc_data.mc_timings[0].timings);
  const [LocationData, setLocation] = useState<Location.LocationObject>();
  const [Selected, setSelected] = useState<Clinic>(docNearData.Clinics[0]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  // useEffect(() => {
  //   if (CurrentHeight < HeightOfScroll) {
  //     console.log('gay');
  //     setTimeout(() => {
  //       setCurrentHeight(CurrentHeight + 50);
  //       scrollView.current?.scrollTo({y: CurrentHeight});
  //     }, 30);
  //   }
  // }, [CurrentHeight, HeightOfScroll]);
  // const formatedTime = () => {
  //   let start = docNearData.mc_data.mc_timings[0].timings[0].split(":");
  //   let end = docNearData.mc_data.mc_timings[0].timings[1].split(":");
  //   let startNum = Number(start[0]);
  //   let endNum = Number(end[0]);
  //   let res: string[] = [];
  //   if (startNum > 12) {
  //     startNum -= 12;
  //     start[0] = startNum;
  //     if (start[1] != "00") res.push(start.join(":") + "PM");
  //     else res.push(start[0] + " PM");
  //   } else {
  //     res.push(start.join(":") + "AM");
  //   }
  //   if (endNum > 12) {
  //     endNum -= 12;
  //     end[0] = endNum;
  //     if (end[1] != "00") res.push(end.join(":") + "PM");
  //     else res.push(end[0] + " PM");
  //   } else {
  //     res.push(end.join(":") + "AM");
  //   }
  //   return res;
  // };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignSelf: "center",
            height: 200,
            width: 200,
            marginTop: 20,
            backgroundColor: "white",
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: docNearData.photo }}
            style={{
              alignSelf: "center",
              height: 180,
              width: 180,
              resizeMode: "contain",
              borderRadius: 12,
            }}
          ></Image>
        </View>
        <Text
          style={[
            styles.text,
            { fontSize: 20, textAlign: "center", marginTop: 10 },
          ]}
        >
          Dr. {docNearData.name}
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: 12, color: "#979C9E", textAlign: "center" },
          ]}
        >
          {docNearData.email}
        </Text>
        <FlatList
          data={docNearData.Clinics}
          style={{ marginTop: 32 }}
          renderItem={(val) => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                marginTop: 8,
                padding: 16,
              }}
              onPress={() => {
                setSelected(val.item);
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  value={val.item.uuid}
                  status={
                    JSON.stringify(val.item) == JSON.stringify(Selected)
                      ? "checked"
                      : "unchecked"
                  }
                />
                <View>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold" }}>Name : </Text>{" "}
                    {val.item.name}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold" }}>Address : </Text>
                    {val.item.address}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={{ fontWeight: "bold" }}>Distance : </Text>
                    {LocationData &&
                      calcDistance(
                        LocationData.coords.latitude,
                        LocationData.coords.longitude,
                        val.item.lat,
                        val.item.long
                      )
                        .toFixed(2)
                        .toString() + " Kms"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (context?.user.uuid) {
              const res = await createBooking(
                Selected.Consultation.uuid,
                context.user.uuid
              );
              if(res)
              navigation.goBack()
            }
          }}
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
            Book to join virtual queue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default DocDetails;

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
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    justifyContent: "center",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
});
