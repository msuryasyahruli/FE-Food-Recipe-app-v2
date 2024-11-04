import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkToken = async () => {
        try {
          const isLogin = await AsyncStorage.getItem("token");
          if (!isLogin) {
            navigation.navigate("(auth)", { screen: "sign-in" });
            await AsyncStorage.clear();
          } else {
            navigation.navigate("(tabs)", { screen: "home" });
          }
        } catch (error) {
          console.error("Error checking user token:", error);
        }
      };
      checkToken();
    }, 200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/mama-recipe-logo.png")} />
      <TouchableOpacity onPress={() => navigation.navigate("(tabs)", { screen: "home" })}>
        <Text style={styles.title}>Mama Recipe</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 18,
    color: "#EEC302",
  },
});
