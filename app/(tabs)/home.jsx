import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Image, ScrollView } from "native-base";
import { Link, useNavigation } from "expo-router";
import { useListRecipe } from "../../config/redux/hooks/recipeHook";

const Home = () => {
  const navigation = useNavigation();
  const [onRefresh, setOnRefresh] = useState(false);
  const [refetchKey, setRefetchKey] = useState(Date.now());
  const [search, setSearch] = useState("");

  const handleDetail = (id) => {
    navigation.navigate("detail/[id]", { id });
  };

  const options = {
    page: 1,
    limit: 6,
  };

  const { data: recipesList, isLoading } = useListRecipe(options, refetchKey);

  const handleRefresh = () => {
    setOnRefresh(true);
    setRefetchKey(Date.now());
    setSearch("");
    setOnRefresh(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={onRefresh} onRefresh={handleRefresh} />
          }
        >
          <View style={{ margin: 20 }}>
            <View style={styles.search}>
              <TextInput
                style={{ flex: 1 }}
                onChangeText={(value) => setSearch(value)}
                placeholder="Search Pasta, Bread, etc"
                value={search}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("search/[search]", { search })
                }
              >
                <Image
                  source={require("../../assets/search.png")}
                  alt="search"
                  tintColor={"#B6B6B6"}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontSize: 18,
                marginHorizontal: 20,
                fontWeight: "bold",
              }}
            >
              Popular Recipe
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  marginHorizontal: 20,
                }}
              >
                {recipesList?.map((data, i) => (
                  <View
                    key={i}
                    style={{ borderRadius: 2, position: "relative" }}
                  >
                    <Image
                      source={{ uri: data.recipe_thumbnail }}
                      alt="gambar"
                      style={{ height: 180, width: 300, borderRadius: 12 }}
                    />
                    <Text style={styles.titleStyle}>{data.recipe_title}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Categories</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/categoriesIcon/soup.png")}
                  alt="gambar"
                />
                <Text>Soup</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/categoriesIcon/dessert.png")}
                  alt="gambar"
                />
                <Text>Chiken</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/categoriesIcon/seafood.png")}
                  alt="gambar"
                />
                <Text>Seafood</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/categoriesIcon/dessert.png")}
                  alt="gambar"
                />
                <Text>Dessert</Text>
              </View>
            </View>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 20, gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>For you</Text>
              <Link
                href="/more-menu"
                style={{ fontSize: 16, color: "#6D61F2" }}
              >
                More
              </Link>
            </View>
            <View style={{ gap: 20 }}>
              {isLoading ? (
                <Text style={{ textAlign: "center" }}>Loading...</Text>
              ) : recipesList?.length > 0 ? (
                recipesList?.map((data, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.menu}
                    onPress={() => handleDetail(data.recipe_id)}
                  >
                    <Image
                      source={{ uri: data.recipe_thumbnail }}
                      alt="gambar"
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
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ textAlign: "center" }}>
                  You haven't made a recipe yet
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    width: "100%",
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 16,
    color: "#B6B6B6",
    gap: 10,
  },
  titleStyle: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "#EEC302",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
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
