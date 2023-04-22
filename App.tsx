import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RootNav from "./src/navigation";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ProvideContext } from "./src/lib/Context";
import { loadAsync, useFonts } from "expo-font";
export default function App() {
  const [loaded, error] = useFonts({
    ReadexPro: require("./assets/fonts/ReadexPro.ttf"),
  });
  if (!loaded) return <></>;
  return (
    <ProvideContext>
      <NavigationContainer>
        <StatusBar style="light" />
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
