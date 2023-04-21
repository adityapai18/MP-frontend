import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppContext } from "../lib/Context";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";

const Index = () => {
  const context = useAppContext();
  return context?.user ? <UserStack></UserStack> : <AuthStack></AuthStack>;
};

export default Index;

const styles = StyleSheet.create({});