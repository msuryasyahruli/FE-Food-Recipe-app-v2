import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextArea } from "native-base";
import { useNavigation, useSearchParams } from "expo-router";
import ButtonInput from "../components/Button";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import ImageInput from "../components/ImageInput";
import { useCategories } from "../config/redux/hooks/categoryHook";
import ShowToast from "../config/toast";
import { useDetailRecipe } from "../config/redux/hooks/recipeHook";
import { updateRecipe } from "../config/redux/actions/recipeAction";

// assets
import bookOpenIcon from "../assets/postIcon/book-open.png";
import videoIcon from "../assets/postIcon/video.png";

const EditRecipe = () => {
  const navigation = useNavigation();
  const { id } = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [initialState, setInitialState] = useState({
    thumbnail: "",
    title: "",
    ingredients: "",
    videoLink: "",
    category: "",
  });

  const { data: detailList, isLoading } = useDetailRecipe(id);
  const { data: categoryList } = useCategories();

  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (detailList) {
      const newInitialState = {
        thumbnail: detailList?.recipe_thumbnail || "",
        title: detailList?.recipe_title || "",
        ingredients: detailList?.recipe_ingredients || "",
        videoLink: detailList?.recipe_video || "",
        category: detailList?.category_name || "",
      };
      setInitialState(newInitialState);
      setPayload(newInitialState);
    }
  }, [detailList]);

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleConfirmUpdateRecipe = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (payload.title !== initialState.title) {
        formData.append("recipe_title", payload.title);
      }
      if (payload.ingredients !== initialState.ingredients) {
        formData.append("recipe_ingredients", payload.ingredients);
      }
      if (payload.videoLink !== initialState.videoLink) {
        formData.append("recipe_video", payload.videoLink);
      }
      if (payload.category !== initialState.category) {
        formData.append("category_id", payload.category);
      }
      if (payload.thumbnail !== initialState.thumbnail) {
        formData.append("recipe_thumbnail", {
          uri: payload.thumbnail,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }

      await updateRecipe(id, formData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleUpdateRecipe = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to update a recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: handleConfirmUpdateRecipe },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {isLoading ? (
            <Text style={{ textAlign: "center" }}>Loading...</Text>
          ) : (
            <>
              <View style={{ gap: 18, width: "100%", marginBottom: 12 }}>
                <ImageInput
                  onChange={(value) => handleChange("thumbnail", value)}
                  value={payload.thumbnail}
                />
                <Input
                  icon={bookOpenIcon}
                  placeholder={"Title"}
                  onChange={(value) => handleChange("title", value)}
                  value={payload.title}
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
                  value={payload.ingredients}
                />
                <SelectInput
                  options={categoryList}
                  onChange={(value) => handleChange("category", value)}
                  selectedValue={payload.category}
                />
                <Input
                  icon={videoIcon}
                  placeholder={"Link Video"}
                  onChange={(value) => handleChange("videoLink", value)}
                  value={payload.videoLink}
                />
              </View>
              <ButtonInput
                title="Update"
                onClick={handleUpdateRecipe}
                loading={loading}
              />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EditRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
