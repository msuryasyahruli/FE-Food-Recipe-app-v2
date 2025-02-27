import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../config/redux/hooks/userHook";

// assets
import userImg from "../../assets/user.png";
import profile from "../../assets/profileIcon/user.png";
import award from "../../assets/profileIcon/award.png";
import bookmark from "../../assets/profileIcon/bookmark.png";
import like from "../../assets/profileIcon/like.png";
import out from "../../assets/profileIcon/logout.png";

const menu = [
  {
    title: "Edit Profile",
    path: "edit-profile",
    icon: profile,
  },
  {
    title: "My Recipe",
    path: "my-recipe",
    icon: award,
  },
  {
    title: "Saved Recipe",
    path: "saved-recipe",
    icon: bookmark,
  },
  {
    title: "Liked Recipe",
    path: "liked-recipe",
    icon: like,
  },
];

const Profile = () => {
  const navigation = useNavigation();

  const { data: userData, isLoading } = useUser();

  const handleConfirmLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    navigation.replace("(auth)", { screen: "sign-in" });
  };

  const handleLogout = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to log out!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleConfirmLogout },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.picture}>
        <Image
          source={
            userData.user_photo === null
              ? userImg
              : { uri: userData.user_photo }
          }
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            width: 100,
            height: 100,
          }}
        />
        <Text style={{ color: "white", fontSize: 24 }}>
          {!isLoading && userData.user_name}
        </Text>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={styles.mainMenu}>
          {menu.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menu}
              onPress={() => navigation.navigate(item.path)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <Image
                  source={item.icon}
                  tintColor={"#EEC302"}
                  style={{ width: 24, height: 24 }}
                />
                <Text>{item.title}</Text>
              </View>
              <Image
                source={require("../../assets/profileIcon/ic-chevron.png")}
                style={{ width: 16, height: 16 }}
                tintColor={"#B6B6B6"}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.menu} onPress={handleLogout}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <Image
                source={out}
                tintColor={"red"}
                style={{ width: 24, height: 24 }}
              />
              <Text>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  picture: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEC302",
    height: 308,
    gap: 10,
  },
  mainMenu: {
    backgroundColor: "white",
    flex: 1,
    width: "95%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: -50,
  },
  menu: {
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
