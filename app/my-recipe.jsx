import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NativeBaseProvider, ScrollView } from "native-base";
import img1 from "../assets/recipes/margherita.png";
import img2 from "../assets/recipes/veg-loaded.png";

const dataList = [
  {
    recipe_title: "Margherita",
    recipe_thumbnail: img1,
    recipe_by: "In veg pizza",
    category_name: "Spicy",
  },
  {
    recipe_title: "Veg loaded",
    recipe_thumbnail: img2,
    recipe_by: "In pizza mania",
    category_name: "Spicy",
  },
];

const MyRecipe = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20, gap: 20 }}>
            {dataList.length > 0 ? (
              dataList.map((data, i) => (
                <TouchableOpacity key={i} style={styles.menu}>
                  <Image source={data.recipe_thumbnail} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {data.recipe_title}
                    </Text>
                    <Text>{data.recipe_by}</Text>
                    <Text style={{ fontWeight: "bold" }}>{data.category_name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                      <Image
                        source={require("../assets/edit.png")}
                        style={{ width: 36, height: 36 }}
                        tintColor={"green"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
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
});
