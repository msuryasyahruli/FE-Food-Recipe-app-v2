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
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    confirm_password: "",
  });

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await register(payload);
      if (res?.statusCode === 201) {
        navigation.replace("sign-in");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: "#EEC302", marginBottom: 20 }}>
        Let's Get Started!
      </Text>
      <FormAuth
        title="Username"
        type="user"
        placeholder="Enter username"
        icon={userIcon}
        onChange={(value) => handleChange("user_name", value)}
      />
      <FormAuth
        title="Email"
        type="email"
        placeholder="Enter email"
        icon={mailIcon}
        onChange={(value) => handleChange("user_email", value)}
      />
      <FormAuth
        title="Phone Number"
        type="phone"
        placeholder="Enter phone number"
        icon={mailIcon}
        onChange={(value) => handleChange("user_phone", value)}
      />
      <FormAuth
        title="Password"
        type="password"
        placeholder="Enter password"
        icon={passwordIcon}
        onChange={(value) => handleChange("user_password", value)}
      />
      <FormAuth
        title="Confirm Password"
        type="password"
        placeholder="Confirm password"
        icon={passwordIcon}
        onChange={(value) => handleChange("confirm_password", value)}
      />
      <ButtonInput
        title="Register"
        style={{ marginTop: 20 }}
        onClick={handleRegister}
        loading={loading}
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
