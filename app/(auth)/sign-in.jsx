import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, View } from "react-native";
import { Link, useNavigation } from "expo-router";
import FormAuth from "../../components/FormAuth";
import ButtonInput from "../../components/Button";
import { login } from "../../config/redux/actions/userAction";

//assets
import mailIcon from "../../assets/authIcon/mail.png";
import passwordIcon from "../../assets/authIcon/lock.png";

const Login = () => {
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
    try {
      const res = await login(data);
      if (res.statusCode === 201) {
        navigation.navigate("(tabs)", { screen: "home" });
        AsyncStorage.setItem("token", res.data.token_user);
        AsyncStorage.setItem("userId", res.data.user_id);
      }
    } catch (error) {
      console.error(error);
    }
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
