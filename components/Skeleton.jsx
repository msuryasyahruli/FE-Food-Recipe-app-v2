import React from "react";
import { View } from "react-native";
import { Skeleton } from "native-base";

const LoaderCardRecipe = () => {
  return [...Array(4)].map((_, i) => (
    <View
      key={i}
      style={{
        flexDirection: "row",
        gap: 14,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Skeleton height={"80px"} width={"80px"} borderRadius={12} />
      <View style={{ flex: 1 }}>
        <Skeleton height={15} width={200} borderRadius={8} />
        <Skeleton
          height={15}
          width={100}
          borderRadius={8}
          style={{ marginTop: 5 }}
        />
        <Skeleton
          height={15}
          width={100}
          borderRadius={8}
          style={{ marginTop: 5 }}
        />
      </View>
    </View>
  ));
};

const LoaderBanner = () => {
  return [...Array(3)].map((_, i) => (
    <Skeleton key={i} height={180} width={300} borderRadius={12} />
  ));
};

const LoaderCategory = () => {
  return [...Array(4)].map((_, i) => (
    <Skeleton key={i} height={"80px"} width={"80px"} borderRadius={12} />
  ));
};

const LoaderDetail = () => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          bottom: 28,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <View style={{ flex: 1 }}>
          <Skeleton height={10} width={200} borderRadius={15} />
          <Skeleton
            height={15}
            width={150}
            borderRadius={8}
            style={{ marginTop: 5 }}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Skeleton height={10} width={10} borderRadius={20} />
          <Skeleton height={10} width={10} borderRadius={20} />
        </View>
      </View>
    </>
  );
};

const LoaderIngredient = () => {
  return (
    <>
      <Skeleton.Text lines={8} />
    </>
  );
};

export {
  LoaderCardRecipe,
  LoaderBanner,
  LoaderCategory,
  LoaderDetail,
  LoaderIngredient,
};
