import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FormAuth from "../../components/FormAuth";
import { updatePassword } from "../../config/redux/actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

//assets
import passwordIcon from "../../assets/authIcon/lock.png";
import ButtonInput from "../../components/Button";

const PasswordRecovery = () => {
  const navigation = useNavigation();

  const [payload, setPayload] = useState({
    user_password: "",
    confirm_password: "",
  });

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleResetPassword = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const res = await updatePassword(userId, payload);
      if (res?.statusCode === 200) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, color: "#EEC302", marginBottom: 24 }}>
        Reset password
      </Text>
      <FormAuth
        title="Create New Password"
        type="password"
        placeholder="Enter new password"
        icon={passwordIcon}
        onChange={(value) => handleChange("user_password", value)}
      />
      <FormAuth
        title="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        icon={passwordIcon}
        onChange={(value) => handleChange("confirm_password", value)}
      />
      <ButtonInput
        title="Reset Password"
        style={{ marginTop: 20 }}
        onClick={handleResetPassword}
        disabled={true}
      />
    </View>
  );
};

export default PasswordRecovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
