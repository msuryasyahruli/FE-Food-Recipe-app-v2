import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "native-base";
import { Link, useNavigation } from "expo-router";
import axios from "axios";
import { API_URL } from '@env';

// assets
import img from "../../assets/recipe1.png";

const Home = () => {
  const navigation = useNavigation();
  const [recipesList, setRecipesList] = useState([]);

  const handleDetail = (id) => {
    navigation.navigate("detail/[id]", { id });
  };

  const options = {
    page: 1,
    limit: 6,
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/recipes`, {options})
      .then((res) => {
        setRecipesList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [options]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <View style={styles.search}>
              <Image
                source={require("../../assets/search.png")}
                alt="search"
                tintColor={"#B6B6B6"}
                style={{ height: 20, width: 20 }}
              />
              <Link href="/search">
                <Text>Search Pasta, Bread, etc</Text>
              </Link>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <Text
              style={{ fontSize: 18, marginHorizontal: 20, fontWeight: "bold" }}
            >
              Popular Recipe
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View
                style={{ flexDirection: "row", gap: 20, marginHorizontal: 20 }}
              >
                <Image source={img} alt="gambar" />
                <Image source={img} alt="gambar" />
                <Image source={img} alt="gambar" />
                <Image source={img} alt="gambar" />
              </View>
            </ScrollView>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Categories</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>For you</Text>
              <Link href="/more-menu" style={{ fontSize: 16, color: "#6D61F2" }}>
                More
              </Link>
            </View>
            <View style={{ gap: 20 }}>
              {recipesList.length > 0 ? (
                recipesList.map((data, i) => (
                  <TouchableOpacity key={i} style={styles.menu} onPress={() => handleDetail(data.recipe_id)}>
                    <Image source={{uri: data.recipe_thumbnail}} alt="gambar" style={styles.img} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
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
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    borderColor: 'black',
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
