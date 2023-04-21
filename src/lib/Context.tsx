import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import axios from "axios";
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
  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((response: any) => {
      setUser(response.user);
    }).catch((err)=>{
      alert(err);
    })
  };
  const signup = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        updateProfile(response.user, {
          displayName: firstName + " " + lastName,
        })
          .then(() => {
            setUser(response.user);
            return response;
          })
          .catch((error: any) => {
            alert(error.message);
            return;
          });
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  };
  const signout = () => {
    signOut(auth).then(() => {
      setUser(undefined);
    });
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    // Cleanup subscription on unmount
    return unsubscribe;
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