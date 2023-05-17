import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNav from "./src/navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ProvideContext } from "./src/lib/Context";
import { loadAsync, useFonts } from "expo-font";

import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    if (error) {
      console.log("error occurred");
    }
    if (data) {
      // console.log("data-----", data);
      AsyncStorage.setItem('latestNoti',JSON.stringify(data))
    }
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [loaded, error] = useFonts({
    ReadexPro: require("./assets/fonts/ReadexPro.ttf"),
  });
  if (!loaded) return <></>;
  return (
    <ProvideContext>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="white" />
        <RootNav />
      </NavigationContainer>
    </ProvideContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
