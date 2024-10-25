import { View, Text, Image } from "react-native";
import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
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
        backgroundColor: focused && "#EEF0F3",
        height: 36,
        width: 64,
        borderRadius: 10
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={`${focused ? "#EEC302" : "#6E80B0"}`}
        style={{ width: 24, height: 24 }}
      />
      {/* <Text
        style={
          focused
            ? { fontWeight: "bold", color: "#EEC302" }
            : { fontWeight: "normal", color: "#6E80B0" }
        }
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <NativeBaseProvider style={{ backgroundColor: "#EEF0F3" }}>
      {/* <StatusBar backgroundColor="#EEF0F3" translucent={false} /> */}
      <Tabs screenOptions={{ tabBarShowLabel: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={home} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={plus} name="Create" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: "Message",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabsIcon icon={message} name="Message" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
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
