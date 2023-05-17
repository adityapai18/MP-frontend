import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Clinic from '../screens/Kyc/Clinic';
import Doctor from '../screens/Kyc/Doctor';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Doctor" component={Doctor} />
      <Stack.Screen name="Clinic" component={Clinic} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
