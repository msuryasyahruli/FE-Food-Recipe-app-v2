import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormAuth from "../../components/FormAuth";
import userIcon from "../../assets/authIcon/user.png";
import mailIcon from "../../assets/authIcon/mail.png";
import passwordIcon from "../../assets/authIcon/lock.png";
import { Link, useNavigation } from "expo-router";
import ButtonInput from "../../components/Button";
import { useToast } from "native-base";
import axios from "axios";
import { API_URL } from "@env";

const Register = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const data = {
      user_name: payload.name,
      user_email: payload.email,
      user_password: payload.password,
      confirm_password: payload.confirmPassword,
    };
    axios.post(`${API_URL}/users/register`, data).then((res) => {
      if (res.status === 201) {
        navigation.navigate("(auth)", { screen: "sign-in" });
        toast.show({
          title: res.data.message,
          placement: "top",
        });
      } else {
        toast.show({
          title: res.data,
          placement: "top",
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: "#EEC302", marginBottom: 20 }}>
        Let's Get Started!
      </Text>
      <FormAuth
        title="Username"
        type="user"
        placeholder="John Doe"
        icon={userIcon}
        onChange={(value) => handleChange("name", value)}
      />
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
      <FormAuth
        title="Confirm Password"
        type="password"
        placeholder="********"
        icon={passwordIcon}
        onChange={(value) => handleChange("confirmPassword", value)}
      />
      <ButtonInput
        title="Register"
        style={{ marginTop: 20 }}
        onClick={handleRegister}
      />
      <Text>
        Already have account?{" "}
        <Link href="/sign-in" style={styles.linkColor}>
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    padding: 20,
  },
  linkColor: {
    color: "#EEC302",
  },
});
