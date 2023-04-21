import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNav from "./src/navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ProvideContext } from "./src/lib/Context";
export default function App() {
  return (
    <ProvideContext>
      <NavigationContainer>
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
