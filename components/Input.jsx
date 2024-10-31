import { Image, StyleSheet, TextInput, View } from "react-native";
import React from "react";

const Input = ({ icon, placeholder, onChange }) => {
  return (
    <View style={styles.input}>
      <Image
        source={icon}
        alt="book"
        style={{ width: 24, height: 24 }}
        tintColor={"#B6B6B6"}
      />
      <TextInput placeholder={placeholder} style={{ flex: 1 }} onChangeText={onChange} />
    </View>
  );s
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
});
