import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  PermissionsAndroid,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../constants/theme";
import { useAppContext } from "../lib/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Carousel";
import DoctorNearCard from "../components/DoctorNearCard";
import { BottomSheet } from "../components/BottomSheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LiveQueueOnGoing from "../components/LiveQueueOnGoing";
import DoctorSpeciality from "../components/DoctorSpeciality";
import { getHyperDeviceId } from "../lib/Hyper";
import {
  checkPermissions,
  getAllPermissions,
  registerForPushNotificationsAsync,
} from "../lib/Helper";
import { getDoctorsExtended } from "../lib/Api";
import { DoctorExtended } from "../lib/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
//   import {DocNearData} from '../lib/helpers/interfaces';

const Home = ({ navigation }: any) => {
  const auth = useAppContext();
  const [Loading, setLoading] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [DocSpec, setDocSpec] = useState<string[]>([]);
  const [NearDoc, setNearDoc] = useState<DoctorExtended[]>([]);
  const [ShowBottomSheet, setShowBottomSheet] = useState(false);

  const onNearDocPress = async (item: any) => {
    navigation.navigate("DocDetails", {
      data: item,
    });
  };
  const greeting = () => {
    const date = new Date();
    const currentTime = date.getHours();
    let greet = "";
    if (currentTime >= 4 && currentTime <= 12) {
      greet = "Good Morning";
    } else if (currentTime > 12 && currentTime <= 18) {
      greet = "Good Afternoon";
    } else {
      greet = "Good Evening";
    }
    return greet;
  };
  const getAndSetClinics = async () => {
    const data = await getDoctorsExtended();
    setNearDoc(data);
    setLoading(false);
    console.log(data[0]);
  };
  useEffect(() => {
    checkPermissions().then((val) => {
      if (!val) {
        setShowBottomSheet(true);
      }
    });
    getAndSetClinics();
    AsyncStorage.getItem("latestNoti").then((val) => {
      if (val) alert(JSON.stringify(val));
    });
  }, []);
  return (
    <>
      <SafeAreaView style={style.mainConatiner}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={{ marginBottom: 10 }}>
            <Image
              source={require("../../assets/Logo.png")}
              style={{
                alignSelf: "center",
                top: -55,
                height: 150,
                width: 150,
                marginBottom: -105,
              }}
            ></Image>
            <Text
              style={[
                style.text,
                { color: COLORS.dark, textAlign: "center", marginVertical: 15 },
              ]}
            >
              {greeting()}, {auth?.user.name}
            </Text>
            <SearchBar
              PlaceHolder={"Search Something ...."}
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              //   onSearchBarPressed={() => navigation.navigate("SearchPage")}
              setClicked={setClicked}
            ></SearchBar>
          </View>
          <Carousel />
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={[style.text, { color: "black", fontSize: 18 }]}>
              Doctors near you
            </Text>
            <TouchableOpacity>
              <Text style={[style.text, { color: "rgba(36, 164, 222, 1)" }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {Loading && (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          )}
          <FlatList
            data={NearDoc}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{
              // marginVertical: 10,
              marginBottom: auth?.NotificationData ? 40 : 88,
              marginTop: 10,
            }}
            renderItem={(val) => (
              <DoctorNearCard
                key={val.item.uuid}
                speciality={""}
                onPress={() => onNearDocPress(val.item)}
                imageURL={val.item.photo}
                fname={val.item.name.split(" ")[0]}
                lname={val.item.name.split(" ")[1]}
              />
            )}
          />
          {auth?.NotificationData && (
            <LiveQueueOnGoing onPressOpen={() => {}} />
          )}
          {auth?.Loading && <Loader />}
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        show={ShowBottomSheet}
        height={550}
        onOuterClick={() => {
          console.log("first");
        }}
      >
        <View>
          <Image
            source={require("../../assets/LocationPermissionImg.jpg")}
            style={{
              width: "100%",
              height: 330,
              resizeMode: "cover",
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}
          ></Image>
          <Text
            style={[
              style.text,
              { color: "rgba(9, 5, 38, 1)", fontSize: 20, textAlign: "center" },
            ]}
          >
            Enable your location
          </Text>
          <Text
            style={[
              style.text,
              {
                color: "rgba(111, 111, 115, 1)",
                textAlign: "center",
                marginHorizontal: 35,
              },
            ]}
          >
            <Text style={{ color: "rgba(36, 164, 222, 1)" }}>My Doctor</Text>{" "}
            collects location data to show doctors near your area and track your
            appointments even when the app is not in use
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await getAllPermissions();
              setShowBottomSheet(false);
            }}
            style={style.bottomSheetCloseButton}
          >
            <Text style={[style.buttonText, style.text]}>Turn On</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowBottomSheet(false);
            }}
          >
            <Text
              style={[
                style.text,
                { color: "#24A4DE", marginTop: 15, textAlign: "center" },
              ]}
            >
              No, thanks
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default Home;

const style = StyleSheet.create({
  mainConatiner: {
    paddingTop: 16,
    backgroundColor: COLORS.offWhite,
    flex: 1,
  },
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  curvedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: FONTS.regular,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 46,
    margin: 12,
    padding: 8,
    color: COLORS.lightgray,
    width: "80%",
    alignSelf: "center",
  },
  bottomSheetText: {
    fontSize: 24,
    marginBottom: 80,
  },
  bottomSheetCloseButton: {
    backgroundColor: "#24A4DE",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
