import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unSavedRecipe } from "../config/redux/actions/bookmarkAction";
import { useBookmarks } from "../config/redux/hooks/bookmarkHook";
import { LoaderCardRecipe } from "../components/Skeleton";
import { useNavigation } from "expo-router";

const SavedRecipe = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [refetchKey, setRefetchKey] = useState(Date.now());

  useEffect(() => {
    const getData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error("Error fetching id:", error);
      }
    };
    getData();
  }, []);

  const { data: saveList, isLoading } = useBookmarks(userId, refetchKey);

  const handleUnsave = async (savedId) => {
    try {
      await unSavedRecipe(savedId);
      setRefetchKey(Date.now());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View>
            {isLoading ? (
              <LoaderCardRecipe />
            ) : saveList.length > 0 ? (
              saveList.map((data, i) => (
                <TouchableHighlight
                  key={i}
                  style={styles.menu}
                  underlayColor="#DDDDDD"
                  onPress={() =>
                    navigation.navigate("detail/[id]", { id: data.recipe_id })
                  }
                >
                  <>
                    <Image
                      source={{ uri: data.recipe_thumbnail }}
                      alt="thumbnail"
                      style={styles.img}
                      onPress={() =>
                        navigation.navigate("detail/[id]", {
                          id: data.recipe_id,
                        })
                      }
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {data.recipe_title}
                      </Text>
                      <Text>{data.recipe_by}</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {data.category_name}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => handleUnsave(data.bookmark_id)}
                      >
                        <Image
                          source={require("../assets/trash.png")}
                          style={{ width: 36, height: 36 }}
                          tintColor={"red"}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                </TouchableHighlight>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>
                You haven't saved the recipe
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default SavedRecipe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minHeight: "100%",
    paddingVertical: 10,
  },
  menu: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
