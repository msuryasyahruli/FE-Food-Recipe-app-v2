import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "native-base";

const ButtonInput = ({ title, onClick, style }) => {
  return (
    <>
      <Button style={[styles.button, style]} onPress={onClick}>
        {title}
      </Button>
    </>
  );
};

export default ButtonInput;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#EEC302",
    borderRadius: 10,
    marginVertical: 8,
  },
});
