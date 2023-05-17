import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import axios from "axios";
import baseUrl from "./baseUrl";
import { Doctor, KycData } from "./interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./Helper";
import * as Notifications from "expo-notifications";
import { createClinic, createConsult, createDoctor } from "./Api";

interface Authcon {
  Doctor: Doctor;
  signin: (email: string, password: string) => void;
  signup: (data:KycData) => Promise<void>;
  signout: () => void;
  updateProfilePic: (photourl: string) => void;
}
const authContext = createContext<Authcon | null>(null);

export function ProvideContext({ children }: any) {
  const auth = useProvideContext();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAppContext = () => {
  return useContext(authContext);
};
function useProvideContext() {
  const [Doctor, setDoctor] = useState<Doctor>();
  const notificationListener = useRef();
  const responseListener = useRef();
  const signin = async (email: string, password: string) => {
    const res = await axios.post(baseUrl + "doctor/login", {
      email,
      password,
    });
    if (res.data.success) {
      await AsyncStorage.setItem("creds", JSON.stringify({ email, password }));
      setDoctor(res.data.data);
    }
    console.log(res.data);
  };
  const signup = async (data: KycData) => {
    const docRes = await createDoctor(data.docData)
    if(docRes){
      const clinicRes = await createClinic(data.c_data)
      if(clinicRes){
        const consultRes = await createConsult(data.consult_data,docRes,clinicRes)
        if(consultRes){
          signin(data.docData.email,data.docData.password);
        }
      }
    }
  };
  const signout = async () => {
    await AsyncStorage.removeItem("creds");
    setDoctor(undefined);
  };
  //   const sendPasswordResetEmail = (email) => {
  //     return firebase
  //       .auth()
  //       .sendPasswordResetEmail(email)
  //       .then(() => {
  //         return true;
  //       });
  //   };
  //   const confirmPasswordReset = (code, password) => {
  //     return firebase
  //       .auth()
  //       .confirmPasswordReset(code, password)
  //       .then(() => {
  //         return true;
  //       });
  //   };
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
    //@ts-ignore
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        alert(JSON.stringify(notification.request.content));
      });
    //@ts-ignore
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        alert(JSON.stringify(response.notification.request.content));
      });

    return () => {
      //@ts-ignore
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("creds").then((val) => {
      if (val) {
        const data = JSON.parse(val);
        signin(data.email, data.password);
      }
    });
  }, []);
  // Return the Doctor object and auth methods
  return {
    Doctor,
    signin,
    signup,
    signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
