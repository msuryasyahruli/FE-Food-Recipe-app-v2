import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "expo-router";

const EditProfile = () => {
  const [isChangePicture, setChangePicture] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const openChangePicture = () => {
    setChangePicture(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeChangePicture = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setChangePicture(false));
  };

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menu} onPress={openChangePicture}>
          <Text>Change Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.replace("(auth)", { screen: "password-recovery" })}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isChangePicture}
        onRequestClose={closeChangePicture}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[{ gap: 14 }, { transform: [{ translateY: slideUp }] }]}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Photo Library</Text>
              </TouchableOpacity>
              <View style={styles.hr} />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={closeChangePicture}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 20,
  },
  menu: {
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E7E7",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingBottom: 38,
  },
  modalContent: {
    width: 320,
    backgroundColor: "#E7E7E7",
    borderRadius: 15,
    alignItems: "center",
  },
  button: {
    width: 320,
    borderRadius: 15,
    backgroundColor: "#E7E7E7",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
});
