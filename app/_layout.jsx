import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

const profileMenuOptions = {
  headerTitleAlign: "center",
  headerTintColor: "#EEC302",
};

const RootLayout = () => {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="detail/[id]"
          options={{ title: "", headerTransparent: true, headerTintColor: "#EEC302", }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{ title: "Edit Profile", ...profileMenuOptions }}
        />
        <Stack.Screen
          name="my-recipe"
          options={{ title: "My Recipe", ...profileMenuOptions }}
        />
        <Stack.Screen
          name="saved-recipe"
          options={{ title: "Saved Recipe", ...profileMenuOptions }}
        />
        <Stack.Screen
          name="liked-recipe"
          options={{ title: "Liked Recipe", ...profileMenuOptions }}
        />
        <Stack.Screen
          name="more-menu"
          options={{ title: "All Recipe", ...profileMenuOptions }}
        />
      </Stack>
    </NativeBaseProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
