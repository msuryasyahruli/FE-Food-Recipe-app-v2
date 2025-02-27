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
import logo from "../../assets/mama-recipe-logo.png";

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(payload);
      if (res?.statusCode === 201) {
        navigation.replace("(tabs)", { screen: "home" });
        AsyncStorage.setItem("token", res.data.token);
        AsyncStorage.setItem("userId", res.data.user_id);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ margin: 10 }} />
      <Text style={{ fontSize: 24, color: "#EEC302" }}>Wellcome !</Text>
      <FormAuth
        title="Email"
        type="email"
        placeholder="Enter your email"
        icon={mailIcon}
        onChange={(value) => handleChange("user_email", value)}
      />
      <FormAuth
        title="Password"
        type="password"
        placeholder="Enter your password"
        icon={passwordIcon}
        onChange={(value) => handleChange("user_password", value)}
      />
      <View style={styles.forgotLink}>
        <Link href="/password-recovery" style={styles.linkColor}>
          Forgot password?
        </Link>
      </View>
      <ButtonInput title="Login" onClick={handleLogin} loading={loading} />
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
