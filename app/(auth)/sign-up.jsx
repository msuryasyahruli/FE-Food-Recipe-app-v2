import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link, useNavigation } from "expo-router";
import FormAuth from "../../components/FormAuth";
import ButtonInput from "../../components/Button";
import { register } from "../../config/redux/actions/userAction";

// assets
import passwordIcon from "../../assets/authIcon/lock.png";
import userIcon from "../../assets/authIcon/user.png";
import mailIcon from "../../assets/authIcon/mail.png";

const Register = () => {
  const navigation = useNavigation();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    phone: "",
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
      user_phone: payload.phone,
      user_password: payload.password,
      confirm_password: payload.confirmPassword,
    };
    try {
      const res = await register(data);
      if (res.statusCode === 201) {
        navigation.navigate("sign-in");
      }
    } catch (error) {
      console.error(error);
    }
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
        title="Phone Number"
        type="phone"
        placeholder="081234567890"
        icon={mailIcon}
        onChange={(value) => handleChange("phone", value)}
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
