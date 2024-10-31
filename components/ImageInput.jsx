import { Animated, Easing, Image, Modal, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

// assets
import pictureIcon from "../assets/postIcon/picture.png";

const ImageInput = ({ onChange }) => {
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleOpen = () => {
    setIsOpen(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const hanldeClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri);
      hanldeClose();
      if (onChange) {
        onChange(selectedImageUri);
      }
    }
  };

  return (
    <>
    <View style={styles.inputImage}>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <Button
        onPress={handleOpen}
        borderWidth={0}
        backgroundColor="transparent"
      >
        <Image source={pictureIcon} style={{ width: 24, height: 24 }} tintColor={"#B6B6B6"} />
        {/* <Text>Add Photo</Text> */}
      </Button>
    </View>
    
    <Modal
        transparent={true}
        visible={isOpen}
        onRequestClose={hanldeClose}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[{ gap: 14 }, { transform: [{ translateY: slideUp }] }]}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={hanldeClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  inputImage: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
  },
  imagePreview: {
    height: 250,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingBottom: 38,
  },
  modalContent: {
    width: 300,
    backgroundColor: "#E7E7E7",
    borderRadius: 15,
    alignItems: "center",
  },
  button: {
    width: 300,
    borderRadius: 15,
    backgroundColor: "#E7E7E7",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
