import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

const AuthLayout = () => {
  return (
    <>
      <NativeBaseProvider>
        <Stack screenOptions={{ 
          animation: "slide_from_left"
        }}>
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
          <Stack.Screen
            name="password-recovery"
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: "#EEC302",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </NativeBaseProvider>
    </>
  );
};

export default AuthLayout;
