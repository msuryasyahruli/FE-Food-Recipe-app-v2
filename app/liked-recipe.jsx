import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider, ScrollView, useToast } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';

const LikedRecipe = () => {
  const toast = useToast();
  const [likeList, setLikeList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const response = await axios.get(
          `${API_URL}/likeds/${id}`
        );
        setLikeList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleUnlike = async (likedId) => {
    try {
      await axios.delete(`${API_URL}/likeds/${likedId}`);
      setLikeList(likeList.filter(data => data.liked_id !== likedId));
      toast.show({
        title: "Unliked",
        placement: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20, gap: 20 }}>
            {likeList.length > 0 ? likeList.map((data, i) => (
              <TouchableOpacity key={i} style={styles.menu}>
                <Image source={{ uri: data.recipe_thumbnail }} alt="thumbnail" style={styles.img} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{data.recipe_title}</Text>
                  <Text>{data.recipe_by}</Text>
                  <Text style={{ fontWeight: "bold" }}>{data.category_name}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity onPress={() => handleUnlike(data.liked_id)}>
                    <Image
                      source={require("../assets/trash.png")}
                      style={{ width: 36, height: 36 }}
                      tintColor={"red"}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )) : (
              <Text style={{ textAlign: "center" }}>You don't like any recipes yet</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default LikedRecipe;

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
