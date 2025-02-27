import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeBaseProvider, ScrollView } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unLikeRecipe } from "../config/redux/actions/likeActions";
import { useLikes } from "../config/redux/hooks/likeHook";

const LikedRecipe = () => {
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

  const { data: likeList, isLoading } = useLikes(userId, refetchKey);

  const handleUnlike = async (likedId) => {
    try {
      await unLikeRecipe(likedId);
      setRefetchKey(Date.now());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20, gap: 20 }}>
            {isLoading ?
              <Text style={{ textAlign: "center" }}>Loading...</Text> :
              likeList.length > 0 ? likeList.map((data, i) => (
                <TouchableOpacity key={i} style={styles.menu}>
                  <Image source={{ uri: data.recipe_thumbnail }} alt="thumbnail" style={styles.img} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>{data.recipe_title}</Text>
                    <Text>{data.recipe_by}</Text>
                    <Text style={{ fontWeight: "bold" }}>{data.category_name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity onPress={() => handleUnlike(data.like_id)}>
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
