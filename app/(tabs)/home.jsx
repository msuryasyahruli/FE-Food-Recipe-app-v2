import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Image, ScrollView } from "native-base";
import { Link, useNavigation } from "expo-router";
import { useListRecipe } from "../../config/redux/hooks/recipeHook";
import {
  LoaderBanner,
  LoaderCardRecipe,
  LoaderCategory,
} from "../../components/Skeleton";

// assets
import SoupImage from "../../assets/categoriesIcon/soup.png";
import DessertImage from "../../assets/categoriesIcon/dessert.png";
import SeafoodImage from "../../assets/categoriesIcon/seafood.png";

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

  const categories = [
    {
      img: SoupImage,
      title: "Soup",
    },
    {
      img: DessertImage,
      title: "Chiken",
    },
    {
      img: SeafoodImage,
      title: "Seafood",
    },
    {
      img: DessertImage,
      title: "Dessert",
    },
  ];

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
                {isLoading ? (
                  <LoaderBanner />
                ) : (
                  recipesList?.map((data, i) => (
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
                  ))
                )}
              </View>
            </ScrollView>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Categories</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              {isLoading ? (
                <LoaderCategory />
              ) : (
                categories.map((data, i) => (
                  <View key={i} style={{ alignItems: "center" }}>
                    <Image source={data.img} alt="gambar" style={styles.img} />
                    <Text>{data.title}</Text>
                  </View>
                ))
              )}
            </View>
          </View>

          <View style={{ marginVertical: 10, gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between", marginHorizontal: 20,
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
            <View>
              {isLoading ? (
                <LoaderCardRecipe />
              ) : recipesList?.length > 0 ? (
                recipesList?.map((data, i) => (
                  <TouchableHighlight
                    key={i}
                    style={styles.menu}
                    underlayColor="#DDDDDD"
                    onPress={() => handleDetail(data.recipe_id)}
                  >
                    <>
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
                    </>
                  </TouchableHighlight>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
