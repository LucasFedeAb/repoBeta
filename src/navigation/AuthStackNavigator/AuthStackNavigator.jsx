import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignUpScreen, ProfileScreen } from "../../screens";

const AuthStack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <AuthStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
