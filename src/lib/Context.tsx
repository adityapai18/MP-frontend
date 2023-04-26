import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import { auth } from "./Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import baseUrl from "./baseUrl";
import { User } from "./interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./Helper";
import * as Notifications from 'expo-notifications';

interface Authcon {
  user: User ;
  signin: (email: string, password: string) => void;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  signout: () => void;
  updateProfilePic:(
    photourl:string
  )=>void;
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
  const [user, setUser] = useState<User>();
  const notificationListener = useRef();
  const responseListener = useRef();
  const signin = async (email: string, password: string) => {
    const res = await axios.post(baseUrl+'patient/login',{email,password})
    if(res.data.success){
      await AsyncStorage.setItem('creds',JSON.stringify({email,password}))
      setUser(res.data.data)
    }
    console.log(res.data)
  };
  const signup = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {

  };
  const signout = async() => {
    await AsyncStorage.removeItem('creds')
    setUser(undefined)
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
    registerForPushNotificationsAsync().then(token => console.log(token));
    //@ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      alert(JSON.stringify(notification.request.content))
    });
    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      alert(JSON.stringify(response.notification.request.content));
    });
  
    return () => {
      //@ts-ignore
      Notifications.removeNotificationSubscription(notificationListener.current);
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('creds').then(val=>{
      if(val){
        const data = JSON.parse(val)
        signin(data.email,data.password)
      }
    })
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}
