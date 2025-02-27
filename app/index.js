import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isLogin = await AsyncStorage.getItem("token");
        if (!isLogin) {
          navigation.replace("(auth)", {screen: "sign-in"});
          await AsyncStorage.clear();
        } else {
          navigation.replace("(tabs)", {screen: "home"});
        }
      } catch (error) {
        console.error("Error checking user token:", error);
      }
    };
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/mama-recipe-logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#EDEDED",
  },
});
