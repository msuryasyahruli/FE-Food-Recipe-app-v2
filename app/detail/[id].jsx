import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import { Image, ScrollView, TextArea, useToast } from "native-base";
import ButtonInput from "../../components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const TABS = {
  INGREDIENTS: "Ingredients",
  STEP_VIDEO: "StepVideo",
};

const search = () => {
  const { id } = useSearchParams();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(TABS.INGREDIENTS);
  const [detailList, setDetailList] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/recipes/${id}`)
      .then((res) => {
        setDetailList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_URL}/comments/${id}`)
      .then((res) => {
        setCommentList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, refetchKey]);

  const handleLike = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      axios
        .post(`${API_URL}/likeds`, {
          recipe_id: id,
          user_id: userId,
        })
        .then((res) => {
          toast.show({
            title: res.data.message,
            placement: "top",
          });
          setRefetchKey((prevKey) => prevKey + 1);
        })
        .catch((error) => {
          console.error("Error liking recipe", error);
        });
    } catch (error) {
      console.error("Error liking recipe", error);
    }
  };

  const handleComment = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await axios
        .post(`${API_URL}/comments`, {
          recipe_id: id,
          user_id: userId,
          comment_text: comment,
        })
        .then((res) => {
          toast.show({
            title: res.data.message,
            placement: "top",
          });
          setComment("");
          setRefetchKey((prevKey) => prevKey + 1);
        })
        .catch((error) => {
          console.error("Error comment", error);
        });
    } catch (error) {
      console.error("Error comment", error);
    }
  };

  return (
    <>
      <View style={styles.thumbnail}>
        <Image
          source={{ uri: detailList.recipe_thumbnail }}
          alt="thumbnail"
          style={{ width: "100%", height: "100%" }}
        />
        <View style={styles.title}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleStyle} numberOfLines={2}>
              {detailList.recipe_title}
            </Text>
            <Text style={{ color: "white" }}>by: {detailList.recipe_by}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/bookmark.png")}
                alt="bookmarkIcon"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike}>
              <Image source={require("../../assets/like.png")} alt="likeIcon" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.tabs}>
          {Object.keys(TABS).map((key) => {
            const tab = TABS[key];
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab === TABS.INGREDIENTS ? "Ingredients" : "Video Step"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {activeTab === TABS.INGREDIENTS && (
          <View
            style={{
              backgroundColor: "#FAF7ED",
              padding: 14,
              borderRadius: 20,
            }}
          >
            <Text>{detailList.recipe_ingredients}</Text>
          </View>
        )}
        {activeTab === TABS.STEP_VIDEO && (
          <ScrollView>
            <View style={{ gap: 20 }}>
              <TouchableOpacity style={styles.videoBtn}>
                <Image
                  source={require("../../assets/detailIcon/play.png")}
                  alt="gbr"
                  style={{ width: 50, height: 50 }}
                  tintColor={"#EEC302"}
                />
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>Video</Text>
                  <Text numberOfLines={1}>{detailList.recipe_video}</Text>
                </View>
              </TouchableOpacity>
              <TextArea
                placeholder="Comment:"
                h={16}
                borderRadius={10}
                borderWidth={0}
                backgroundColor="#FAF7ED"
                p={5}
                fontSize="sm"
                value={comment}
                onChangeText={(value) => setComment(value)}
              />
              <ButtonInput title="Comment" onClick={handleComment} />
            </View>

            <View style={{ marginTop: 20, gap: 14 }}>
              {commentList.length > 0 ? (
                commentList?.map((data, i) => (
                  <View key={i} style={{ flexDirection: "row", gap: 12 }}>
                    <Image
                      source={require("../../assets/user.png")}
                      alt="gbr"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 100,
                        backgroundColor: "white",
                      }}
                      tintColor={"#EEC302"}
                    />
                    <View style={{ justifyContent: "center", flex: 1 }}>
                      <Text style={{ fontWeight: "600", fontSize: 16 }}>
                        {data.user_name}
                      </Text>
                      <Text>{data.comment_text}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ textAlign: "center" }}>No comments</Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default search;

const styles = StyleSheet.create({
  thumbnail: {
    height: 308,
    position: "relative",
  },
  title: {
    position: "absolute",
    bottom: 28,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EEC302",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
  },
  main: {
    flex: 1,
    padding: 16,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    gap: 10,
    marginTop: -16,
    backgroundColor: "#f3f3f3",
  },
  tabs: {
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomColor: "#EEC302",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#EEC302",
  },
  videoBtn: {
    backgroundColor: "#FAF7ED",
    padding: 14,
    borderRadius: 20,
    flexDirection: "row",
    gap: 16,
  },
});
