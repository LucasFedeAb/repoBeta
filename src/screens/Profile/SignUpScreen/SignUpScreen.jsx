import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./SignUpScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { useSignUpMutation } from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { setUser, setName } from "../../../features/authSlice/authSlice";
import { insertSession } from "../../../db";
import ButtonGradient from "../../../components/ButtonGradient/ButtonGradient";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [confirmTerms, setconfirmTerms] = useState(false);
  const [triggerSignup] = useSignUpMutation();

  const onSubmit = () => {
    //console.log("Login button");
    triggerSignup({
      email,
      password,
    })
      .unwrap()
      .then((result) => {
        //console.log(result);
        dispatch(setUser(result));
        dispatch(setName(username));
        console.log("usernameeee:", username);
        insertSession({
          localId: result.localId,
          email: result.email,
          token: result.idToken,
          username: username,
        });
      })
      .catch((err) => console.log(err));
  };
  const seePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <Text style={styles.logo}>Gif App</Text>
        {/* <SvgTop /> */}
      </View>

      <View style={styles.container}>
        <Text style={styles.titulo}>Welcome !</Text>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="person-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Username"
              placeholderTextColor={"gray"}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="mail-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="E-mail"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="lock-closed-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Password"
              placeholderTextColor={"gray"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity onPress={seePassword}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={25}
                color="#ccc"
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            style={styles.iconInput}
            name="lock-closed-outline"
            size={25}
            color="#ccc"
          />
          <View style={styles.borderContainer}>
            <TextInput
              style={styles.inputEmail}
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              value={confirmPass}
              onChangeText={setConfirmPass}
              secureTextEntry={hideConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setHideConfirmPassword(!hideConfirmPassword);
              }}
            >
              <Ionicons
                name={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={25}
                color="#ccc"
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        <ButtonGradient label={"CREATE ACCOUNT"} onPress={onSubmit} />
        <Text style={styles.noAccount}>Don't have an account?</Text>
        <ButtonGradient
          label={"LOGIN"}
          onPress={() => navigation.navigate("LoginScreen")}
        />

        <View style={styles.termsContainer}>
          <TouchableOpacity
            onPress={() => {
              setconfirmTerms(!confirmTerms);
            }}
          >
            <Ionicons
              name={confirmTerms ? "checkbox" : "square-outline"}
              size={15}
              color="#7cb799"
            />
          </TouchableOpacity>

          <Text style={styles.terms}>
            Acepto los Terminos y Condiciones del Servicio y la Politica de
            Privacidad de Gif App
          </Text>
        </View>
        <StatusBar style="light" />
      </View>
    </View>
  );
};

export default SignUpScreen;
