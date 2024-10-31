import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

const AuthLayout = () => {
  return (
    <>
      <NativeBaseProvider>
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </NativeBaseProvider>
    </>
  );
};

export default AuthLayout;
