import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AuthStackNavigator from "../AuthStackNavigator/AuthStackNavigator";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileImageQuery } from "../../services/permissionsApi";
import { setCameraImage, setUser } from "../../features/authSlice/authSlice";
import { fetchSession } from "../../db";

const MainNavigator = () => {
  const [loadingSession, setLoadingSession] = useState(false);
  const { user, localId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProfileImageQuery(localId);

  useEffect(() => {
    if (data) {
      dispatch(setCameraImage(data.image));
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingSession(true);
        const session = await fetchSession();
        //console.log("Esta es la sesion", session);
        if (session.rows.length) {
          //console.log(session.rows._array[0]);
          const user = session.rows._array[0];
          dispatch(setUser(user));
        }
      } catch (error) {
        console.log("Error en obtener ususario", error.message);
      } finally {
        setLoadingSession(false);
      }
    })();
  }, []);
  return loadingSession ? (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#121212",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Loading Session...</Text>
      </View>
    </>
  ) : !loadingSession && user ? (
    <BottomTabNavigator />
  ) : (
    <AuthStackNavigator />
  );

  //return user ? <BottomTabNavigator /> : <AuthStackNavigator />;
};

export default MainNavigator;
