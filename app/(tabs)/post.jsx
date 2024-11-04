import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextArea } from "native-base";
import ButtonInput from "../../components/Button";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import ImageInput from "../../components/ImageInput";
import { useCategories } from "../../config/redux/hooks/categoryHook";
import { postRecipe } from "../../config/redux/actions/recipeAction";
import ShowToast from "../../config/toast";

// assets
import bookOpenIcon from "../../assets/postIcon/book-open.png";
import videoIcon from "../../assets/postIcon/video.png";

const Post = () => {
  const [payload, setPayload] = useState({
    thumbnail: null,
    title: "",
    ingredients: "",
    videoLink: "",
    category: "",
  });

  const { data: categoryList } = useCategories();

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleConfirmAddRecipe = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const formData = new FormData();
    formData.append("recipe_title", payload.title);
    formData.append("recipe_ingredients", payload.ingredients);
    formData.append("recipe_video", payload.videoLink);
    formData.append("category_id", payload.category);
    formData.append("user_id", userId);
    if (payload.thumbnail !== null) {
      formData.append("recipe_thumbnail", {
        uri: payload.thumbnail,
        name: "image.jpg",
        type: "image/jpeg",
      });
    }
    postRecipe(formData)
      .then(() => {
        setPayload({
          thumbnail: null,
          title: "",
          ingredients: "",
          videoLink: "",
          category: "",
        });
      })
      .catch((error) => {
        ShowToast(error);
      });
  };

  const handleAddRecipe = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to add a new recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleConfirmAddRecipe },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add Your Recipe</Text>
          <View style={{ gap: 18, width: "100%" }}>
            <ImageInput
              onChange={(value) => handleChange("thumbnail", value)}
            />
            <Input
              icon={bookOpenIcon}
              placeholder={"Title"}
              onChange={(value) => handleChange("title", value)}
            />
            <TextArea
              placeholder="Ingredient..."
              h={40}
              borderRadius={10}
              borderWidth={0}
              backgroundColor="white"
              p={5}
              fontSize="sm"
              onChangeText={(value) => handleChange("ingredients", value)}
            />
            <SelectInput
              options={categoryList}
              onChange={(value) => handleChange("category", value)}
            />
            <Input
              icon={videoIcon}
              placeholder={"Link Video"}
              onChange={(value) => handleChange("videoLink", value)}
            />
          </View>
          <ButtonInput title="Post" onClick={handleAddRecipe} />
        </View>
      </ScrollView>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 30,
    padding: 20,
    marginTop: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EEC302",
  },
});
