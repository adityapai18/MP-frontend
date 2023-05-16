import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAppContext } from "../lib/Context";

interface CurrentNotification {
  Visible?: boolean;
  SetVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  onPressOpen: () => void;
}
const LiveQueueOnGoing = ({ onPressOpen }: CurrentNotification) => {
  const auth = useAppContext();
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <View style={styles.position}>
          <Text style={{ fontSize: 24, color: "white" }}>
            {auth?.NotificationData && auth.NotificationData.position
              ? auth.NotificationData.position
              : ""}
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 10, flex: 0.5 }}>
        <Text style={{ fontSize: 12, color: "white", fontWeight: "600" }}>
          Status:{" "}
          {auth?.NotificationData && auth.NotificationData.status
            ? auth.NotificationData.status
            : ""}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="clock" size={16} color="white" />
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "600",
                  marginLeft: 4,
                }}
              >
                ETA
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#24A4DE",
                fontWeight: "600",
              }}
            >
              {auth?.NotificationData && auth.NotificationData.eta
                ? auth.NotificationData.eta
                : ""}
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="clock" size={16} color="white" />
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "600",
                  marginLeft: 4,
                }}
              >
                ETD
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#24A4DE",
                fontWeight: "600",
              }}
            >
              {auth?.NotificationData && auth.NotificationData.eta
                ? auth.NotificationData.etd
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginLeft: 10,
          flex: 0.3,
          height: "70%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={onPressOpen}>
          <Text style={{ color: "white" }}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveQueueOnGoing;

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: "95%",
    position: "absolute",
    backgroundColor: "#090323",
    bottom: 0,
    alignSelf: "center",
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  position: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#24A4DE",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#24A4DE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
