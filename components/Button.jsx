import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Spinner } from "native-base";

const ButtonInput = ({ title, onClick, style, loading, disabled }) => {
  return (
    <>
      <Button
        style={[
          styles.button,
          style,
          { backgroundColor: disabled || loading ? "#9f9f9f" : "#EEC302" },
        ]}
        onPress={onClick}
        disabled={disabled || loading}
      >
        <Text style={styles.text}>{loading ? <Spinner color='#EEC302' /> : title}</Text>
      </Button>
    </>
  );
};

export default ButtonInput;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
