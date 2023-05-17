import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { PermissionsAndroid, Platform } from "react-native";
export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export const getAllPermissions = async () => {
  const permissions = await PermissionsAndroid.requestMultiple([
    'android.permission.ACTIVITY_RECOGNITION',
    'android.permission.ACCESS_FINE_LOCATION',
  ]);

  const background = await PermissionsAndroid.request('android.permission.ACCESS_BACKGROUND_LOCATION')
  // PermissionsAndroid.request('Acti')
  console.log(background)
  return (
    permissions['android.permission.ACTIVITY_RECOGNITION'] == 'granted' &&
    permissions['android.permission.ACCESS_FINE_LOCATION'] == 'granted' &&
    background == 'granted'
  );
};

export const checkPermissions = async () => {
  const permissions =
    (await PermissionsAndroid.check(
      'android.permission.ACCESS_BACKGROUND_LOCATION',
    )) &&
    (await PermissionsAndroid.check(
      'android.permission.ACCESS_FINE_LOCATION',
    )) &&
    (await PermissionsAndroid.check('android.permission.ACTIVITY_RECOGNITION'));

  // PermissionsAndroid.request('Acti')
  return permissions
};