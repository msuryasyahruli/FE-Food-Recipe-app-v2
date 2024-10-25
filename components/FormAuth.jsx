import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import show from "../assets/authIcon/eye.png";
import hide from "../assets/authIcon/eye-crossed.png";

const FormAuth = ({ title, placeholder, type, icon, onChange }) => {
  const [onHide, setOnHide] = useState(true);
  const isSecure = type === "password" && onHide;

  return (
    <View style={styles.textInput}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.input}>
        <Image source={icon} style={styles.icon} tintColor={"#EEC302"} />
        <TextInput
          style={styles.text}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          onChangeText={onChange}
        />
        <TouchableOpacity
          style={type === "password" ? undefined : { display: "none" }}
          onPress={() => setOnHide(!onHide)}
        >
          <Image source={onHide === true ? show : hide} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormAuth;

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 4,
    gap: 6,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 10,
  },
  text: {
    flex: 1,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
