import { Image, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";

const Search = () => {
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.search}>
        <Image
              source={require("../assets/search.png")}
              alt="search"
              tintColor={"#B6B6B6"}
              style={{ height: 20, width: 20 }}
            />
          <TextInput placeholder="Search Pasta, Bread, etc" />
        </View>
      </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: 'white',
    flex: 1,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    width: 350,
    height: 50,
    borderRadius: 15,
    marginTop: 28,
    paddingHorizontal: 16,
    gap: 10,
  },
});
