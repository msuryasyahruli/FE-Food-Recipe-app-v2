import { View, Text, Image } from "react-native";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { Tabs } from "expo-router";
import home from "../../assets/navIcon/home.png";
import plus from "../../assets/navIcon/plus.png";
import message from "../../assets/navIcon/message.png";
import profile from "../../assets/navIcon/profile.png";

const TabsIcon = ({ icon, name, focused }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: focused && "#EEF0F3",
          borderRadius: 18,
          width: 72,
          height: 36,
        }}
      >
        <Image
          source={icon}
          tintColor={`${focused ? "#EEC302" : "#6E80B0"}`}
          style={{ width: 24, height: 24 }}
        />
      </View>
      <Text
        style={
          focused
            ? { fontWeight: "bold", color: "#EEC302" }
            : { fontWeight: "normal", color: "#6E80B0" }
        }
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <NativeBaseProvider style={{ backgroundColor: "#EEF0F3" }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={home} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={plus} name="Create" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: "Message",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={message} name="Message" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={profile} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </NativeBaseProvider>
  );
};

export default TabsLayout;
