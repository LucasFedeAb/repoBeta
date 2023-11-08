import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, AllGifsTitle } from "../../screens";
import { StyleSheet } from "react-native";
import HomeTopTabNavigator from "./HomeTopTabNavigator/HomeTopTabNavigator";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeNav"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
      style={styles.container}
    >
      <Stack.Screen name="HomeNav" component={HomeTopTabNavigator} />
      <Stack.Screen name="AllGifsTitle" component={AllGifsTitle} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeStackNavigator;
