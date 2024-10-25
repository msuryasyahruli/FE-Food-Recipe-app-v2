import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormAuth from "../../components/FormAuth";
import { Link, useNavigation } from "expo-router";
import ButtonInput from "../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";
import { API_URL } from "@env";

//assets
import mailIcon from "../../assets/authIcon/mail.png";
import passwordIcon from "../../assets/authIcon/lock.png";

const Login = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const data = {
      user_email: payload.email,
      user_password: payload.password,
    };
    axios.post(`${API_URL}/users/login`, data).then((res) => {
      if (res.status === 201) {
        navigation.navigate("(tabs)", { screen: "home" });
        AsyncStorage.setItem("token", res.data.data.token_user);
        AsyncStorage.setItem("userId", res.data.data.user_id);
        toast.show({
          title: res.data.message,
          placement: "top",
        });
      } else {
        toast.show({
          title: res.data.message,
          placement: "top",
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/mama-recipe-logo.png")}
        style={{ margin: 10 }}
      />
      <Text style={{ fontSize: 24, color: "#EEC302" }}>Wellcome !</Text>
      <FormAuth
        title="Email"
        type="email"
        placeholder="example@gmail.com"
        icon={mailIcon}
        onChange={(value) => handleChange("email", value)}
      />
      <FormAuth
        title="Password"
        type="password"
        placeholder="********"
        icon={passwordIcon}
        onChange={(value) => handleChange("password", value)}
      />
      <View style={styles.forgotLink}>
        <Link href="/home" style={styles.linkColor}>
          Forgot password?
        </Link>
      </View>
      <ButtonInput title="Login" onClick={handleLogin} />
      <Text>
        Don't have account?{" "}
        <Link href="/sign-up" style={styles.linkColor}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  forgotLink: {
    width: "100%",
    alignItems: "flex-end",
  },
  linkColor: {
    color: "#EEC302",
  },
});
