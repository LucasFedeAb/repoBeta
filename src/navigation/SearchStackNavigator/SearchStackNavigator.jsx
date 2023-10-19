import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListGifsScreen, SearchScreen } from "../../screens";
import styles from "./SearchStackNavigator.style";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

function SearchStackNavigator() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <Stack.Navigator
      initialRouteName="SearchNav"
      /* screenOptions={({ route, navigation }) => ({
        headerShown: true,
        header: () => (
          <View style={[styles.container]}>
            <TouchableOpacity
              style={styles.buttonBackHeader}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={25} color="#FFF" />
              <Text style={styles.textHeader}>Volver</Text>
            </TouchableOpacity>
          </View>
        ),
      })} */
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="SearchNav" component={SearchScreen} />
      <Stack.Screen name="ListGifsNav" component={ListGifsScreen} />
    </Stack.Navigator>
  );
}

export default SearchStackNavigator;
