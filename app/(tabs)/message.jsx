import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

import iconUser from "../../assets/user.png";
import { TouchableOpacity } from "react-native";

const Message = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 12,
          padding: 12,
          borderBottomColor: "silver",
          borderBottomWidth: 1,
        }}
      >
        <Image
          source={iconUser}
          alt="img"
          style={{
            width: 48,
            height: 48,
            backgroundColor: "gray",
            borderRadius: 24,
          }}
        />
        <Text>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
