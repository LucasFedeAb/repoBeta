/* import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import fonts from "./src/global/fonts";
import BottomTabNavigator from "@navigation/BottomTabNavigator/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import styles from "./App.style";
import { useSelector } from "react-redux";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar animated={true} style="light" backgroundColor="#698e71" />
      <Provider store={store}>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: currentTheme.backgroundColor },
          ]}
        >
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </>
  );
} */

import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import fonts from "./src/global/fonts";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import styles from "./App.style";
import MainNavigator from "./src/navigation/MainNavigator/MainNavigator";
import { initDb } from "./src/db";

initDb()
  .then(() => console.log("DB initialized"))
  .catch((err) => console.log("DB failed", err.message));

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  /* return (
    <>
      
      <Provider store={store}>
        <SafeAreaView style={[styles.container]}>
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </>
  ); */
  return (
    <>
      <Provider store={store}>
        <SafeAreaView style={[styles.container]}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </>
  );
}
