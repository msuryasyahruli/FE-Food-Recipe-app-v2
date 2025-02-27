import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import { useNavigation } from "expo-router";
import { useListUserRecipe } from "../config/redux/hooks/recipeHook";
import { deleteRecipe } from "../config/redux/actions/recipeAction";

const MyRecipe = () => {
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

  const { data: userRecipeList, isLoading } = useListUserRecipe(
    userId,
    refetchKey
  );

  const handleDeleteConfirm = async (recipeId) => {
    await deleteRecipe(recipeId);
    setRefetchKey(Date.now());
  };

  const handleDelete = (recipeId) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDeleteConfirm(recipeId) },
      ],
      { cancelable: false }
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20, gap: 20 }}>
            {isLoading ? (
              <Text style={{ textAlign: "center" }}>Loading...</Text>
            ) : userRecipeList.length > 0 ? (
              userRecipeList.map((data, i) => (
                <TouchableOpacity key={i} style={styles.menu}>
                  <Image
                    source={{ uri: data.recipe_thumbnail }}
                    alt="thumbnail"
                    style={styles.img}
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
                      onPress={() =>
                        navigation.navigate("edit-recipe", {
                          id: data.recipe_id,
                        })
                      }
                    >
                      <Image
                        source={require("../assets/edit.png")}
                        style={{ width: 36, height: 36 }}
                        tintColor={"green"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(data.recipe_id)}
                    >
                      <Image
                        source={require("../assets/trash.png")}
                        style={{ width: 36, height: 36 }}
                        tintColor={"red"}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>
                You haven't made a recipe yet
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default MyRecipe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minHeight: "100%",
  },
  menu: {
    flexDirection: "row",
    gap: 14,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
