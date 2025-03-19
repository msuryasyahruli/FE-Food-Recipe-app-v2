import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import { useNavigation } from "expo-router";
import { useListRecipe } from "../config/redux/hooks/recipeHook";
import { LoaderCardRecipe } from "../components/Skeleton";

const MoreMenu = () => {
  const navigation = useNavigation();

  const handleDetail = (id) => {
    navigation.navigate("detail/[id]", { id });
  };

  const options = {
    page: 1,
    limit: 10,
    sortBy: "created_at",
    sort: "asc",
  };

  const { data: recipesList, isLoading } = useListRecipe(options);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20, gap: 20 }}>
            {isLoading ? (
              <LoaderCardRecipe />
            ) : recipesList.length > 0 ? (
              recipesList.map((data, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.menu}
                  onPress={() => handleDetail(data.recipe_id)}
                >
                  <Image
                    source={{ uri: data.recipe_thumbnail }}
                    alt="thumbnail"
                    style={styles.img}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontWeight: "bold", fontSize: 16 }}
                      numberOfLines={2}
                    >
                      {data.recipe_title}
                    </Text>
                    <Text>{data.recipe_by}</Text>
                    <Text>{data.category_name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                      <Image source={require("../assets/bookmark.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={require("../assets/like.png")} />
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

export default MoreMenu;

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
