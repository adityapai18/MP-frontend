import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../constants/theme";
import DocCard from "../components/DocCard";
import LiveQueuePersonCard from "../components/LiveQueuePersonCard";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import baseUrl from "../lib/baseUrl";
import { useAppContext } from "../lib/Context";
import useInterval from "../lib/hooks/useInterval";
import { ConsultExtended } from "../lib/interfaces";
import ClinicCard from "../components/ClinicCard";

// import { checkInt } from '../lib/functions/Network';
// import { setBack } from '../lib/functions/Background';
const Home = ({ navigation }: any) => {
  const context = useAppContext();
  const [ConsultationData, setConsultationData] = useState<ConsultExtended[]>(
    []
  );
  const [SelectedClinic, setSelectedClinic] = useState("");
  useInterval(() => {
    axios
      .get(
        baseUrl +
          "consultation/list?with-doctor=" +
          context?.Doctor.uuid +
          "&super-extended=true"
      )
      .then((val) => {
        console.log(val.data);
        setConsultationData(val.data);
      });
  }, 2500);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
        <Image
          source={require("../../assets/Logo.png")}
          style={{
            top: -55,
            height: 160,
            width: 160,
            marginBottom:-95,
            alignSelf:'center'
          }}
        ></Image>
        {/* <Ionicons
          name="notifications-outline"
          onPress={() => {
            navigation.navigate("Notifications");
          }}
          size={30}
          color="black"
        /> */}
      </View>
      <View>
        <DocCard
          totalBooking={
            ConsultationData.filter(
              (val) => val.clinic_uuid == SelectedClinic
            )[0]
              ? ConsultationData.filter(
                  (val) => val.clinic_uuid == SelectedClinic
                )[0].Appointments.length
              : 0
          }
          timings={[
            ConsultationData.filter(
              (val) => val.clinic_uuid == SelectedClinic
            )[0]
              ? ConsultationData.filter(
                  (val) => val.clinic_uuid == SelectedClinic
                )[0]
                  .start_time.split(":")
                  .slice(0, 2)
                  .join(":")
              : "",
            ConsultationData.filter(
              (val) => val.clinic_uuid == SelectedClinic
            )[0]
              ? ConsultationData.filter(
                  (val) => val.clinic_uuid == SelectedClinic
                )[0]
                  .end_time.split(":")
                  .slice(0, 2)
                  .join(":")
              : "",
          ]}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>
        <FlatList
          data={ConsultationData}
          horizontal
          renderItem={(val) => (
            <ClinicCard
              id={val.item.clinic_uuid}
              setSelected={setSelectedClinic}
              Selected={SelectedClinic}
            />
          )}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[styles.text, { fontSize: 24 }]}>Booking List</Text>
          {/* <AntDesign
            name="search1"
            size={24}
            color="rgba(151, 151, 151, 1)"
            style={{ marginLeft: 25 }}
            onPress={() => navigation.navigate("SearchList")}
          /> */}
        </View>
        {/* {patient?.Loading && (
              <ActivityIndicator
                color={COLORS.primary}
                size={50}></ActivityIndicator>
            )} */}
        <FlatList
          data={
            ConsultationData.filter(
              (val) => val.clinic_uuid == SelectedClinic
            )[0]
              ? ConsultationData.filter(
                  (val) => val.clinic_uuid == SelectedClinic
                )[0].Appointments
              : []
          }
          renderItem={(data) => (
            <LiveQueuePersonCard
              key={data.item.Patient.uuid}
              OnPressed={() => {
                Alert.alert(
                  data.item.Patient.name,
                  "Do you want to end their booking?",
                  [
                    {
                      text: "Cancel",
                    },
                    {
                      text: "Proceed",
                      onPress: async () => {
                        axios.delete(baseUrl + "appointment/" + data.item.uuid);
                      },
                    },
                  ]
                );
              }}
              name={data.item.Patient.name}
              pos={data.index + 1}
              gender={data.item.Patient.gender}
              age={data.item.Patient.dob}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
  dateSelect: {
    width: 72,
    height: 67,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
  SelectedDate: {
    width: 72,
    height: 67,
    borderRadius: 10,
    backgroundColor: "rgba(36, 164, 222, 1)",
    margin: 5,
  },
});
