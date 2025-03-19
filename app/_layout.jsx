import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import store from "../config/redux/store"

const RootLayout = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerTitleAlign: "center",
            headerTintColor: "#EEC302",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="detail/[id]"
            options={{
              title: "",
              headerTransparent: true,
              headerTintColor: "#EEC302",
            }}
          />
          <Stack.Screen
            name="search/[search]"
            options={{
              // headerShown: false,
              animation: "none",
              headerTitleAlign: "left",
            }}
          />
          <Stack.Screen
            name="edit-recipe"
            options={{
              presentation: "modal",
              title: "Edit",
              headerTintColor: "#EEC302",
            }}
          />
          {[
            { name: "edit-profile", title: "Edit Profile" },
            { name: "my-recipe", title: "My Recipe" },
            { name: "saved-recipe", title: "Saved Recipe" },
            { name: "liked-recipe", title: "Liked Recipe" },
            { name: "more-menu", title: "All Recipe" },
          ].map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={{
                title: screen.title,
              }}
            />
          ))}
        </Stack>
      </NativeBaseProvider>
    </Provider>
  );
};

export default RootLayout;
